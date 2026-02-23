interface PowerFlow {
  from: string;
  to: string;
  power: number;
  particles: Array<{ progress: number; speed: number }>;
}

export class InverterFlow {
  private width: number;
  private height: number;
  private flows: PowerFlow[] = [];
  private solarPower: number = 0;
  private batteryPower: number = 0;
  private gridPower: number = 0;
  private loadPower: number = 0;
  private tradingPrice: number = 0;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.initFlows();
  }

  private initFlows() {
    this.flows = [
      { from: 'solar', to: 'inverter', power: 0, particles: [] },
      { from: 'battery', to: 'inverter', power: 0, particles: [] },
      { from: 'inverter', to: 'grid', power: 0, particles: [] },
      { from: 'inverter', to: 'load', power: 0, particles: [] },
    ];
  }

  resize(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D, frameCount: number) {
    ctx.clearRect(0, 0, this.width, this.height);

    // Simulate realistic power flows
    const time = frameCount / 60;
    this.solarPower = Math.max(0, 8 + Math.sin(time * 0.5) * 6);
    this.batteryPower = Math.sin(time * 0.3) * 4;
    this.loadPower = 5 + Math.sin(time * 0.2) * 2;
    this.gridPower = this.loadPower - this.solarPower - this.batteryPower;
    this.tradingPrice = 0.15 + Math.sin(time * 0.4) * 0.1;

    const centerX = this.width / 2;
    const centerY = this.height / 2;

    // Component positions
    const positions = {
      solar: { x: centerX - 200, y: centerY - 150 },
      battery: { x: centerX - 200, y: centerY + 50 },
      inverter: { x: centerX, y: centerY },
      grid: { x: centerX + 200, y: centerY - 150 },
      load: { x: centerX + 200, y: centerY + 50 },
    };

    // Draw connections
    const drawConnection = (from: keyof typeof positions, to: keyof typeof positions, power: number) => {
      const fromPos = positions[from];
      const toPos = positions[to];

      ctx.strokeStyle = power > 0 ? '#00c853' : power < 0 ? '#ff6d00' : '#666';
      ctx.lineWidth = Math.abs(power) > 0 ? 3 : 1;
      ctx.setLineDash([10, 5]);
      ctx.beginPath();
      ctx.moveTo(fromPos.x, fromPos.y);
      ctx.lineTo(toPos.x, toPos.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Power label
      if (Math.abs(power) > 0.1) {
        const midX = (fromPos.x + toPos.x) / 2;
        const midY = (fromPos.y + toPos.y) / 2;
        ctx.fillStyle = '#fff';
        ctx.font = '14px DM Sans';
        ctx.textAlign = 'center';
        ctx.fillText(`${Math.abs(power).toFixed(1)} kW`, midX, midY - 10);
      }

      // Animated particles
      if (Math.abs(power) > 0.1) {
        const flow = this.flows.find(f => f.from === from && f.to === to);
        if (flow) {
          if (frameCount % 10 === 0) {
            flow.particles.push({ progress: 0, speed: 0.02 });
          }

          flow.particles = flow.particles.filter(p => {
            p.progress += p.speed;
            if (p.progress > 1) return false;

            const x = fromPos.x + (toPos.x - fromPos.x) * p.progress;
            const y = fromPos.y + (toPos.y - fromPos.y) * p.progress;

            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fillStyle = power > 0 ? '#b8ff00' : '#ff6d00';
            ctx.shadowBlur = 10;
            ctx.shadowColor = power > 0 ? '#b8ff00' : '#ff6d00';
            ctx.fill();
            ctx.shadowBlur = 0;

            return true;
          });
        }
      }
    };

    // Draw all connections
    drawConnection('solar', 'inverter', this.solarPower);
    drawConnection('battery', 'inverter', this.batteryPower);
    drawConnection('inverter', 'grid', this.gridPower);
    drawConnection('inverter', 'load', this.loadPower);

    // Draw components
    const drawComponent = (key: keyof typeof positions, label: string, icon: string) => {
      const pos = positions[key];
      
      ctx.fillStyle = '#2e342f';
      ctx.fillRect(pos.x - 50, pos.y - 30, 100, 60);
      ctx.strokeStyle = '#00c853';
      ctx.lineWidth = 2;
      ctx.strokeRect(pos.x - 50, pos.y - 30, 100, 60);

      ctx.fillStyle = '#fff';
      ctx.font = '24px DM Sans';
      ctx.textAlign = 'center';
      ctx.fillText(icon, pos.x, pos.y);
      
      ctx.font = '12px DM Sans';
      ctx.fillText(label, pos.x, pos.y + 20);
    };

    drawComponent('solar', 'Solar', '☀️');
    drawComponent('battery', 'Battery', '🔋');
    drawComponent('grid', 'Grid', '⚡');
    drawComponent('load', 'Load', '🏠');

    // Inverter (larger, central)
    ctx.fillStyle = '#1a1f1b';
    ctx.fillRect(centerX - 60, centerY - 40, 120, 80);
    ctx.strokeStyle = '#00c853';
    ctx.lineWidth = 3;
    ctx.strokeRect(centerX - 60, centerY - 40, 120, 80);

    ctx.fillStyle = '#fff';
    ctx.font = '16px DM Sans';
    ctx.textAlign = 'center';
    ctx.fillText('Hybrid', centerX, centerY - 10);
    ctx.fillText('Inverter', centerX, centerY + 10);

    // DC/AC indicator
    ctx.font = '12px DM Sans';
    ctx.fillStyle = '#00c853';
    ctx.fillText('DC', centerX - 70, centerY);
    ctx.fillText('AC', centerX + 70, centerY);

    // AC sine wave visualization
    ctx.strokeStyle = '#00c853';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < 40; i++) {
      const x = centerX - 20 + i;
      const y = centerY + 30 + Math.sin((i + frameCount) * 0.3) * 5;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Power summary panel
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(20, 20, 250, 140);
    ctx.strokeStyle = '#00c853';
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 20, 250, 140);

    ctx.fillStyle = '#fff';
    ctx.font = '14px DM Sans';
    ctx.textAlign = 'left';
    ctx.fillText('Power Flow Summary', 30, 45);
    ctx.fillText(`Solar: ${this.solarPower.toFixed(1)} kW`, 30, 70);
    ctx.fillText(`Battery: ${this.batteryPower >= 0 ? '+' : ''}${this.batteryPower.toFixed(1)} kW`, 30, 90);
    ctx.fillText(`Grid: ${this.gridPower >= 0 ? '+' : ''}${this.gridPower.toFixed(1)} kW`, 30, 110);
    ctx.fillText(`Load: ${this.loadPower.toFixed(1)} kW`, 30, 130);

    // CARBONOZ trading ticker
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(this.width - 270, 20, 250, 80);
    ctx.strokeStyle = '#b8ff00';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.width - 270, 20, 250, 80);

    ctx.fillStyle = '#b8ff00';
    ctx.font = '14px DM Sans';
    ctx.textAlign = 'left';
    ctx.fillText('CARBONOZ Trading', this.width - 260, 45);
    ctx.fillStyle = '#fff';
    ctx.fillText(`Price: €${this.tradingPrice.toFixed(3)}/kWh`, this.width - 260, 70);
    ctx.fillText(this.gridPower < 0 ? 'Status: SELLING' : 'Status: BUYING', this.width - 260, 90);
  }
}
