interface LiIon {
  x: number;
  y: number;
  targetX: number;
  speed: number;
}

export class BatteryCell {
  private width: number;
  private height: number;
  private ions: LiIon[] = [];
  private soc: number = 0;
  private charging: boolean = true;
  private voltage: number = 3.2;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.initIons();
  }

  private initIons() {
    for (let i = 0; i < 20; i++) {
      this.ions.push({
        x: this.width * 0.2,
        y: Math.random() * this.height * 0.6 + this.height * 0.2,
        targetX: this.width * 0.8,
        speed: 0.5 + Math.random() * 0.5,
      });
    }
  }

  resize(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D, frameCount: number) {
    ctx.clearRect(0, 0, this.width, this.height);

    const centerY = this.height / 2;
    const anodeX = this.width * 0.2;
    const cathodeX = this.width * 0.8;
    const separatorX = this.width * 0.5;

    // Draw Anode (left)
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(anodeX - 40, centerY - 100, 80, 200);
    ctx.fillStyle = '#fff';
    ctx.font = '14px DM Sans';
    ctx.textAlign = 'center';
    ctx.fillText('Anode', anodeX, centerY + 130);
    ctx.fillText('(Graphite)', anodeX, centerY + 150);

    // Draw Separator (center)
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(separatorX, centerY - 120);
    ctx.lineTo(separatorX, centerY + 120);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#999';
    ctx.fillText('Separator', separatorX, centerY + 140);

    // Draw Cathode (right)
    ctx.fillStyle = '#00963e';
    ctx.fillRect(cathodeX - 40, centerY - 100, 80, 200);
    ctx.fillStyle = '#fff';
    ctx.fillText('Cathode', cathodeX, centerY + 130);
    ctx.fillText('(LiFePO₄)', cathodeX, centerY + 150);

    // Update SOC cycle
    if (this.charging) {
      this.soc += 0.2;
      if (this.soc >= 100) {
        this.charging = false;
        this.soc = 100;
      }
    } else {
      this.soc -= 0.2;
      if (this.soc <= 0) {
        this.charging = true;
        this.soc = 0;
      }
    }

    this.voltage = 2.5 + (this.soc / 100) * 1.15;

    // Update and draw Li+ ions
    this.ions.forEach((ion) => {
      const target = this.charging ? cathodeX : anodeX;
      
      if (Math.abs(ion.x - target) > 5) {
        ion.x += (target - ion.x) * 0.01 * ion.speed;
      }

      // Draw ion
      ctx.beginPath();
      ctx.arc(ion.x, ion.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#60a5fa';
      ctx.fill();
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Label
      ctx.fillStyle = '#fff';
      ctx.font = '10px DM Sans';
      ctx.textAlign = 'center';
      ctx.fillText('Li⁺', ion.x, ion.y + 3);
    });

    // Draw electron flow (external circuit)
    const electronY = centerY - 150;
    const electronProgress = (frameCount % 100) / 100;
    const electronX = this.charging 
      ? anodeX + (cathodeX - anodeX) * electronProgress
      : cathodeX - (cathodeX - anodeX) * electronProgress;

    ctx.strokeStyle = '#ffd600';
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 5]);
    ctx.beginPath();
    ctx.moveTo(anodeX, centerY - 100);
    ctx.lineTo(anodeX, electronY);
    ctx.lineTo(cathodeX, electronY);
    ctx.lineTo(cathodeX, centerY - 100);
    ctx.stroke();
    ctx.setLineDash([]);

    // Electron
    ctx.beginPath();
    ctx.arc(electronX, electronY, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffd600';
    ctx.fill();

    // SOC Bar
    const barX = this.width * 0.1;
    const barY = this.height - 60;
    const barWidth = this.width * 0.8;
    const barHeight = 20;

    ctx.fillStyle = '#2e342f';
    ctx.fillRect(barX, barY, barWidth, barHeight);
    
    ctx.fillStyle = '#00c853';
    ctx.fillRect(barX, barY, barWidth * (this.soc / 100), barHeight);

    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.strokeRect(barX, barY, barWidth, barHeight);

    // Labels
    ctx.fillStyle = '#fff';
    ctx.font = '16px DM Sans';
    ctx.textAlign = 'left';
    ctx.fillText(`SOC: ${Math.round(this.soc)}%`, barX, barY - 10);
    ctx.fillText(`Voltage: ${this.voltage.toFixed(2)}V`, barX + 150, barY - 10);
    ctx.fillText(this.charging ? 'Charging' : 'Discharging', barX + 350, barY - 10);
  }
}
