import React from 'react'
import './App.css'

function App() {
  const colorPalette = [
    { name: 'Primary', variable: '--color-primary', hex: '#875A7B', description: 'Buttons, links, accents' },
    { name: 'Secondary', variable: '--color-secondary', hex: '#A89BB9', description: 'Hover effects, alternate accents' },
    { name: 'Success', variable: '--color-success', hex: '#28A745', description: 'Notifications, confirmation' },
    { name: 'Warning', variable: '--color-warning', hex: '#FFC107', description: 'Alerts, warnings' },
    { name: 'Danger', variable: '--color-danger', hex: '#DC3545', description: 'Error messages' },
    { name: 'Info', variable: '--color-info', hex: '#007BFF', description: 'Hyperlinks, tooltips' }
  ]

  return (
    <div className="App">
      <header className="App-header">
        <h1>BuildCrew Odoo Hackathon</h1>
        <p>
          Welcome to the <span className="highlight">Skill Swap Platform</span> project!
        </p>
        <p>
          Frontend is running on React with Vite and a custom theme system.
        </p>
        <div className="button-demo">
          <button className="btn btn-primary">Get Started</button>
          <button className="btn btn-secondary">Learn More</button>
        </div>
      </header>

      <section className="theme-demo">
        <h2>🎨 Theme Color Palette</h2>
        <p className="text-muted">
          This project uses a consistent color theme based on Odoo's brand colors. 
          All colors are available as CSS custom properties for easy customization.
        </p>
        
        <div className="color-palette">
          {colorPalette.map((color) => (
            <div key={color.name} className="color-item">
              <div 
                className="color-preview" 
                style={{ backgroundColor: color.hex }}
              ></div>
              <div className="color-name">{color.name}</div>
              <div className="color-code">{color.hex}</div>
              <div className="color-code">var({color.variable})</div>
              <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
                {color.description}
              </p>
            </div>
          ))}
        </div>

        <h3 style={{ color: 'var(--color-primary)', marginTop: '2rem' }}>Button Styles</h3>
        <div className="button-demo">
          <button className="btn btn-primary">Primary</button>
          <button className="btn btn-secondary">Secondary</button>
          <button className="btn btn-success">Success</button>
          <button className="btn btn-warning">Warning</button>
          <button className="btn btn-danger">Danger</button>
          <button className="btn btn-info">Info</button>
        </div>

        <h3 style={{ color: 'var(--color-primary)', marginTop: '2rem' }}>Text Utilities</h3>
        <div style={{ marginTop: '1rem' }}>
          <p className="text-primary">Primary text color</p>
          <p className="text-secondary">Secondary text color</p>
          <p className="text-success">Success text color</p>
          <p className="text-warning">Warning text color</p>
          <p className="text-danger">Danger text color</p>
          <p className="text-info">Info text color</p>
          <p className="text-muted">Muted text color</p>
        </div>
      </section>
    </div>
  )
}

export default App 