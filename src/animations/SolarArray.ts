interface Photon {
  x: number;
  y: number;
  speed: number;
  targetPanel: number;
}

export class SolarArray {
  private width: number;
  private height: number;
  private photons: Photon[] = [];
  private sunAngle: number = 0;
  private irradiance: number = 800;
  private power: number = 0;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  resize(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D, frameCount: number) {
    ctx.clearRect(0, 0, this.width, this.height);

    // Update sun position
    this.sunAngle = (frameCount % 360) * (Math.PI / 180);
    const sunX = this.width * 0.5 + Math.cos(this.sunAngle) * this.width * 0.3;
    const sunY = this.height * 0.2 + Math.sin(this.sunAngle) * 50;

    // Draw sun
    const sunGradient = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 40);
    sunGradient.addColorStop(0, '#ffd600');
    sunGradient.addColorStop(1, '#ff6d00');
    ctx.fillStyle = sunGradient;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 30, 0, Math.PI * 2);
    ctx.fill();

    // Sun rays
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4 + frameCount * 0.01;
      const x1 = sunX + Math.cos(angle) * 35;
      const y1 = sunY + Math.sin(angle) * 35;
      const x2 = sunX + Math.cos(angle) * 50;
      const y2 = sunY + Math.sin(angle) * 50;
      
      ctx.strokeStyle = '#ffd600';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // Draw solar panels (3x5 grid, isometric)
    const panelStartX = this.width * 0.3;
    const panelStartY = this.height * 0.5;
    const panelWidth = 60;
    const panelHeight = 40;
    const spacing = 10;

    this.irradiance = 600 + Math.abs(Math.sin(this.sunAngle)) * 400;
    this.power = (this.irradiance / 1000) * 15 * 0.85; // 15 panels, 85% efficiency

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 5; col++) {
        const x = panelStartX + col * (panelWidth + spacing);
        const y = panelStartY + row * (panelHeight + spacing);
        
        // Panel intensity based on sun angle
        const intensity = Math.max(0.3, Math.abs(Math.sin(this.sunAngle)));
        
        // Draw panel (isometric rectangle)
        ctx.fillStyle = `rgba(0, 145, 234, ${intensity})`;
        ctx.fillRect(x, y, panelWidth, panelHeight);
        
        ctx.strokeStyle = '#0091ea';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, panelWidth, panelHeight);

        // Panel cells
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 5; j++) {
            const cellX = x + 5 + j * 10;
            const cellY = y + 5 + i * 10;
            ctx.fillStyle = `rgba(184, 255, 0, ${intensity * 0.5})`;
            ctx.fillRect(cellX, cellY, 8, 8);
          }
        }
      }
    }

    // Generate photons
    if (frameCount % 5 === 0) {
      this.photons.push({
        x: sunX,
        y: sunY,
        speed: 2 + Math.random(),
        targetPanel: Math.floor(Math.random() * 15),
      });
    }

    // Update and draw photons
    this.photons = this.photons.filter((photon) => {
      photon.y += photon.speed;
      
      if (photon.y > panelStartY + 150) {
        return false;
      }

      ctx.beginPath();
      ctx.arc(photon.x, photon.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#ffd600';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#ffd600';
      ctx.fill();
      ctx.shadowBlur = 0;

      return true;
    });

    // Draw power flow to battery
    const batteryX = this.width * 0.8;
    const batteryY = this.height * 0.6;
    const mpptX = this.width * 0.65;
    const mpptY = this.height * 0.55;

    // MPPT box
    ctx.fillStyle = '#2e342f';
    ctx.fillRect(mpptX - 30, mpptY - 20, 60, 40);
    ctx.strokeStyle = '#00c853';
    ctx.lineWidth = 2;
    ctx.strokeRect(mpptX - 30, mpptY - 20, 60, 40);
    ctx.fillStyle = '#fff';
    ctx.font = '12px DM Sans';
    ctx.textAlign = 'center';
    ctx.fillText('MPPT', mpptX, mpptY + 5);

    // Battery icon
    ctx.fillStyle = '#00c853';
    ctx.fillRect(batteryX - 25, batteryY - 15, 50, 30);
    ctx.fillRect(batteryX + 25, batteryY - 5, 5, 10);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.strokeRect(batteryX - 25, batteryY - 15, 50, 30);

    // Animated power flow lines
    const flowProgress = (frameCount % 60) / 60;
    
    ctx.strokeStyle = '#00c853';
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 5]);
    ctx.beginPath();
    ctx.moveTo(panelStartX + 150, panelStartY + 60);
    ctx.lineTo(mpptX, mpptY);
    ctx.lineTo(batteryX, batteryY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Flow particle
    const flowX = panelStartX + 150 + (batteryX - panelStartX - 150) * flowProgress;
    const flowY = panelStartY + 60 + (batteryY - panelStartY - 60) * flowProgress;
    ctx.beginPath();
    ctx.arc(flowX, flowY, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#b8ff00';
    ctx.fill();

    // Metrics panel
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(20, 20, 200, 100);
    ctx.strokeStyle = '#00c853';
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 20, 200, 100);

    ctx.fillStyle = '#fff';
    ctx.font = '14px DM Sans';
    ctx.textAlign = 'left';
    ctx.fillText(`Irradiance: ${Math.round(this.irradiance)} W/m²`, 30, 45);
    ctx.fillText(`DC Power: ${this.power.toFixed(2)} kW`, 30, 70);
    ctx.fillText(`Efficiency: 85%`, 30, 95);
  }
}
