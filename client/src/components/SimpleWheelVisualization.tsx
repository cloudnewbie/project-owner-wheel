import React, { useEffect, useRef } from 'react';

// Using the global p5 instance from the CDN
declare const p5: any;

interface WheelVisualizationProps {
  owners: string[];
  selectedTopic: string;
}

const SimpleWheelVisualization: React.FC<WheelVisualizationProps> = ({ owners, selectedTopic }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || !p5) return;
    
    // Cleanup previous canvas
    if (canvasRef.current) {
      canvasRef.current.remove();
    }

    // Create new p5 instance
    const sketch = (p: any) => {
      p.setup = function() {
        // Create canvas with responsive dimensions
        const containerWidth = containerRef.current?.offsetWidth || 400;
        p.createCanvas(containerWidth, containerWidth);
        p.angleMode(p.DEGREES);
        p.textAlign(p.CENTER, p.CENTER);
      };

      p.draw = function() {
        p.background('rgba(0,0,0,0)');
        
        // Predefined owner names (exactly in this order)
        const wheelOwners = [
          "Sayan Ghosh",
          "Emmanuel Akinlabi",
          "Shivanjali Kumar",
          "Chandra Vyas",
          "Jay Mehta"
        ];
        
        // Draw the wheel
        const diameter = Math.min(p.width, p.height) * 0.9;
        const radius = diameter / 2;
        const totalSegments = wheelOwners.length;
        const anglePerSegment = 360 / totalSegments;
        
        p.push();
        p.translate(p.width/2, p.height/2);
        
        // Draw segments with owners
        for (let i = 0; i < totalSegments; i++) {
          const startAngle = i * anglePerSegment;
          const endAngle = startAngle + anglePerSegment;
          const midAngle = startAngle + (anglePerSegment / 2);
          
          // Alternate colors (blue and pink)
          const segmentColor = i % 2 === 0 ? p.color('#87CEFA') : p.color('#FF69B4');
          
          p.fill(segmentColor);
          p.stroke(0);
          p.strokeWeight(2);
          p.arc(0, 0, diameter, diameter, startAngle, endAngle, p.PIE);
          
          // Draw name
          p.push();
          p.rotate(midAngle);
          p.translate(radius * 0.65, 0);
          p.rotate(90);
          p.fill(0);
          p.noStroke();
          p.textSize(diameter * 0.04);
          p.textStyle(p.BOLD);
          p.text(wheelOwners[i], 0, 0);
          p.pop();
        }
        
        // Draw arrow based on topic - pointing to center of each segment
        let arrowAngle = 0;
        
        // Find the correct owner for each topic and point to their segment center
        if (selectedTopic === "GLIMS Bluesky Migration") {
          // Point to Sayan Ghosh (index 0)
          arrowAngle = (0 * anglePerSegment) + (anglePerSegment / 2);
        } else if (selectedTopic === "DMS") {
          // Point to Sayan Ghosh (index 0)
          arrowAngle = (0 * anglePerSegment) + (anglePerSegment / 2);
        } else if (selectedTopic === "DSCS HAckathon") {
          // Point to Emmanuel Akinlabi (index 1)
          arrowAngle = (1 * anglePerSegment) + (anglePerSegment / 2);
        } else if (selectedTopic === "DR and HA for DDP") {
          // Point to Shivanjali Kumar (index 2)
          arrowAngle = (2 * anglePerSegment) + (anglePerSegment / 2);
        } else if (selectedTopic === "MongoDB eval") {
          // Point to Chandra Vyas (index 3)
          arrowAngle = (3 * anglePerSegment) + (anglePerSegment / 2);
        }
        
        // Draw arrow
        const arrowSize = diameter * 0.18;
        p.push();
        p.rotate(arrowAngle);
        p.fill(p.color('#FF0000'));
        p.noStroke();
        p.beginShape();
        p.vertex(0, 0);
        p.vertex(-arrowSize * 0.4, -arrowSize * 0.9);
        p.vertex(0, -arrowSize);
        p.vertex(arrowSize * 0.4, -arrowSize * 0.9);
        p.endShape(p.CLOSE);
        p.pop();
        
        p.pop();
        
        p.noLoop(); // Only draw once
      };

      p.windowResized = function() {
        if (!containerRef.current) return;
        const containerWidth = containerRef.current.offsetWidth;
        p.resizeCanvas(containerWidth, containerWidth);
        p.redraw();
      };
    };

    // Create p5 instance
    setTimeout(() => {
      canvasRef.current = new p5(sketch, containerRef.current);
    }, 100);

    // Cleanup
    return () => {
      if (canvasRef.current) {
        canvasRef.current.remove();
      }
    };
  }, [owners, selectedTopic]);

  return <div ref={containerRef} className="wheel-container" />;
};

export default SimpleWheelVisualization;