
**CYBICONZ HERO — "TOKYO FORGE" — FINAL BUILD PROMPT**

```
Rebuild src/components/sections/HeroCanvas.tsx and 
src/components/sections/Hero.tsx completely.

BRAND COLORS (use these everywhere, replace all indigo):
--brand-blue: #00C4FF    (electric blue — primary)
--brand-green: #39FF14   (neon green — accent)  
--brand-dark-blue: #0066FF (deep blue — depth)
--bg: #020408            (near-black, slight blue tint)

THE CONCEPT: "Tokyo Forge"
Split-screen hero. Left side: cinematic Tokyo wireframe cityscape 
with the CybiconZ shield floating above it in Three.js. 
Right side: a premium glassmorphism terminal card showing live 
studio intelligence — real data, real projects, real metrics.
Together they say: "serious Tokyo tech agency that ships real work."

════════════════════════════════════════════════════════
PART 1 — HeroCanvas.tsx (Three.js — LEFT/BACKGROUND)
════════════════════════════════════════════════════════

Setup:
- Canvas fills entire hero section (absolute, inset 0)
- Camera: position [0, 2, 10], fov: 48
- Fog: THREE.FogExp2(0x020408, 0.038)
- Background color: 0x020408

──────────────────────────────────
A. TOKYO WIREFRAME CITYSCAPE
──────────────────────────────────
12 abstract building volumes (BoxGeometry) arranged as a 
stylized Tokyo skyline. Positioned at the bottom of scene, 
receding into depth.

Define buildings as array of {w, h, d, x, z} — hand-placed:
[
  {w:0.8, h:5.0, d:0.8, x:-7.5, z:-3},
  {w:1.2, h:7.5, d:1.0, x:-6.0, z:-2},
  {w:0.9, h:4.0, d:0.7, x:-5.0, z:-4},
  {w:1.4, h:9.0, d:1.2, x:-3.8, z:-2.5},
  {w:0.7, h:3.5, d:0.6, x:-2.8, z:-4.5},
  {w:1.0, h:6.0, d:0.9, x:-1.5, z:-3},
  {w:1.3, h:8.0, d:1.1, x: 1.5, z:-3},
  {w:0.8, h:3.8, d:0.7, x: 2.8, z:-4.5},
  {w:1.5,h:10.5, d:1.3, x: 3.8, z:-2.5},
  {w:0.9, h:4.2, d:0.8, x: 5.0, z:-4},
  {w:1.1, h:7.0, d:1.0, x: 6.0, z:-2},
  {w:0.8, h:4.8, d:0.7, x: 7.5, z:-3},
]

All buildings positioned y so their base sits at y: -3.0
(y_position = -3.0 + h/2)

Each building:
- EdgesGeometry(BoxGeometry(w, h, d))
- LineSegments with LineBasicMaterial
- Color: #00C4FF
- Opacity: varies by depth — closer buildings 0.12, far 0.06
  (buildings at z > -3.5 get opacity 0.08, others 0.13)
- NO fill geometry — wireframe lines only

Window dots on buildings (optional but adds depth):
For each building, add 3-6 tiny SphereGeometry(0.025) at random 
positions on the building face. MeshBasicMaterial #00C4FF opacity 
0.4. Flicker: each has a random chance (0.002 per frame) to toggle 
visible = !visible. Creates "lights in buildings" effect.

──────────────────────────────────
B. THE CYBICONZ SHIELD
──────────────────────────────────
The shield floats ABOVE the cityscape, center-left of scene.
Position: [-1.5, 1.2, 0]

Build shield geometry using THREE.Shape:
const s = new THREE.Shape()
s.moveTo(0, 2.0)
s.lineTo(1.8, 1.2)
s.lineTo(1.9, -0.2)
s.quadraticCurveTo(1.7, -1.8, 0, -2.5)
s.quadraticCurveTo(-1.7, -1.8, -1.9, -0.2)
s.lineTo(-1.8, 1.2)
s.closePath()

ExtrudeGeometry: depth 0.25, bevelEnabled true, 
bevelThickness 0.04, bevelSize 0.04, bevelSegments 3

Main shield mesh:
MeshStandardMaterial {
  color: #060d1a,
  metalness: 0.95,
  roughness: 0.06,
  envMapIntensity: 1.2
}

3 nested wireframe outlines (EdgesGeometry, scaled):
- Outer (scale 1.05): LineBasicMaterial #00C4FF opacity 0.7, 
  linewidth 1 (note: linewidth >1 not supported on WebGL, 
  use opacity instead)
- Middle (scale 0.88): LineBasicMaterial #0066FF opacity 0.35
- Inner (scale 0.72): LineBasicMaterial #39FF14 opacity 0.45

CZ letterform on shield face:
Create with THREE.ShapePath — simplified geometric "CZ":
- C: arc shape, positioned left-center of shield
- Z: angular zigzag, positioned right-center, overlapping C
Both as LineSegments, color #39FF14, opacity 0.8
Scale to fit inside shield (approximately 0.8 × 0.8 units)

Shield animations:
- Slow Y rotation: += 0.004 per frame
- Gentle float: position.y += Math.sin(time * 0.8 + 1.2) * 0.003
- Mouse influence: tilt toward mouse position
  targetRotX = mouseY * -0.25
  targetRotY = mouseX * 0.35 + (time * 0.004) // base rotation + mouse
  Lerp current rotation toward target at 0.04 factor
- Scale pulse: 1.0 + Math.sin(time * 1.5) * 0.008 (very subtle)

──────────────────────────────────
C. ENERGY RINGS AROUND SHIELD
──────────────────────────────────
3 rings, all centered on the shield position [-1.5, 1.2, 0]:

Ring 1: TorusGeometry(2.2, 0.006, 8, 100)
- Color #00C4FF, opacity 0.45
- Rotation: Y += 0.010 per frame

Ring 2: TorusGeometry(2.7, 0.005, 8, 100)
- Initial rotation: X = Math.PI * 0.62
- Color #39FF14, opacity 0.25
- Rotation: X += 0.006

Ring 3: TorusGeometry(3.1, 0.004, 8, 100)
- Initial rotation: Z = Math.PI * 0.38  
- Color #0066FF, opacity 0.18
- Rotation: Z -= 0.004

──────────────────────────────────
D. ELECTRIC ARC SYSTEM
──────────────────────────────────
6 lightning arcs that fire from the shield outward:

For each arc (stored in arcRefs array of 6):
- Generate jagged path from shield edge to 1.8-3.0 units away
- Path function:
  function generateArc(fromX, fromY, fromZ, direction, length) {
    const points = []
    points.push(new THREE.Vector3(fromX, fromY, fromZ))
    const segments = 7
    for (let i = 1; i < segments; i++) {
      const t = i / segments
      points.push(new THREE.Vector3(
        fromX + direction.x * length * t + (Math.random()-0.5) * 0.2,
        fromY + direction.y * length * t + (Math.random()-0.5) * 0.2,
        fromZ + direction.z * length * t + (Math.random()-0.5) * 0.1
      ))
    }
    points.push(new THREE.Vector3(
      fromX + direction.x * length,
      fromY + direction.y * length,
      fromZ
    ))
    return points
  }

6 arc directions (evenly spaced around shield):
[up, upper-right, right, lower-right, lower-left, upper-left]

Each arc:
- THREE.Line with BufferGeometry.setFromPoints(generateArc(...))
- LineBasicMaterial: arcs 0,2,4 = #00C4FF; arcs 1,3,5 = #39FF14
- Opacity 0.7
- lifetime ref: random 0.06-0.12 seconds
- In useFrame: decrement lifetime, when <= 0:
  - If Math.random() < 0.04: regenerate path, reset lifetime
  - Else: mesh.visible = false for a beat, retry next frame
  - This creates sporadic, unpredictable firing pattern

──────────────────────────────────
E. GLOWING GRID FLOOR
──────────────────────────────────
PlaneGeometry(35, 35, 48, 48)
Position: y -3.0, rotation X: -Math.PI * 0.5 (flat floor)

ShaderMaterial:
vertexShader: pass uv and position varyings (standard)

fragmentShader:
uniform float uTime;
uniform vec3 uColorA;  // #00C4FF
uniform vec3 uColorB;  // #39FF14

void main() {
  vec2 grid = abs(fract(vUv * 48.0 - 0.5) - 0.5) / fwidth(vUv * 48.0);
  float line = min(grid.x, grid.y);
  float g = 1.0 - min(line, 1.0);
  
  float dist = length(vUv - 0.5) * 2.0;
  float fade = 1.0 - smoothstep(0.0, 0.9, dist);
  
  // Dual-color pulse waves
  float pulseA = pow(max(0.0, sin(dist * 6.0 - uTime * 1.0) * 0.5 + 0.5), 3.0);
  float pulseB = pow(max(0.0, sin(dist * 6.0 - uTime * 1.0 + 3.14) * 0.5 + 0.5), 3.0);
  
  vec3 color = mix(uColorA, uColorB, pulseB / (pulseA + pulseB + 0.001));
  float alpha = g * fade * 0.16 + (pulseA + pulseB) * fade * 0.06;
  
  gl_FragColor = vec4(color, alpha);
}

transparent: true, side: THREE.DoubleSide
Animate uTime each frame.

──────────────────────────────────
F. LIGHTING
──────────────────────────────────
AmbientLight: #020408, intensity 0.35

Key light (front-blue):
PointLight position [0, 3, 5]: color #00C4FF, intensity 5, distance 18
(primary metallic reflection on shield)

Green accent (right-low):
PointLight position [4, -1, 3]: color #39FF14, intensity 2.5, distance 12

Rim light (left-back):
PointLight position [-4, 2, -2]: color #0044AA, intensity 1.5, distance 14

Ground bounce:
PointLight position [0, -4, 2]: color #001a33, intensity 0.8, distance 10

──────────────────────────────────
G. CAMERA BEHAVIOR
──────────────────────────────────
All via refs, no React state, in useFrame:

Mouse tracking:
mouse.tx = (e.clientX / window.innerWidth - 0.5)
mouse.ty = (e.clientY / window.innerHeight - 0.5)
mouse.cx += (mouse.tx - mouse.cx) * 0.035
mouse.cy += (mouse.ty - mouse.cy) * 0.035

camera.position.x = mouse.cx * 1.0
camera.position.y = 2 - mouse.cy * 0.6
camera.position.z = 10 + scrollProgress * 4
camera.lookAt(0, 0, 0)

Scroll: 
scrollProgress = Math.min(window.scrollY / window.innerHeight, 1)
At scrollProgress 1: camera has pulled back, scene fades with fog

════════════════════════════════════════════════════════
PART 2 — Hero.tsx (Layout + Terminal Card)
════════════════════════════════════════════════════════

SECTION SETUP:
```tsx
<section 
  id="hero-section" 
  data-section="hero-section"
  className="relative overflow-hidden"
  style={{
    background: '#020408',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center'
  }}
>
```

LAYER STACK (z-index order):
z-0: HeroCanvas (absolute, full section, pointer-events-none)
z-1: Vignette overlay  
z-2: Scanline overlay (CSS only)
z-10: Left text column
z-10: Right terminal card

──────────────────────────────────
VIGNETTE + SCANLINES (CSS overlays)
──────────────────────────────────
Vignette div (absolute, inset 0, z-1, pointer-events-none):
background: radial-gradient(
  ellipse 70% 80% at 35% 50%,
  transparent 20%,
  rgba(2,4,8,0.5) 60%,
  rgba(2,4,8,0.95) 100%
)

Scanlines div (absolute, inset 0, z-2, pointer-events-none):
background: repeating-linear-gradient(
  0deg,
  transparent,
  transparent 3px,
  rgba(0,196,255,0.012) 3px,
  rgba(0,196,255,0.012) 4px
)
opacity: 1

──────────────────────────────────
LEFT COLUMN — Text Content
──────────────────────────────────
Position: absolute left, centered vertically
Width: 52% on desktop, full width on mobile
Padding: pl-[8vw]

```tsx
<div className="relative z-10 flex flex-col justify-center"
     style={{
       position: 'absolute',
       left: 0,
       top: '50%',
       transform: 'translateY(-50%)',
       width: 'min(52%, 620px)',
       paddingLeft: '8vw',
       paddingRight: '2rem'
     }}>

  {/* Eyebrow */}
  <motion.div 
    initial={{opacity:0, x:-20}} 
    animate={{opacity:1, x:0}} 
    transition={{duration:0.6, delay:0.2}}
    className="flex items-center gap-3 mb-8"
  >
    <div style={{
      width:32, height:1, 
      background:'linear-gradient(to right, #00C4FF, #39FF14)'
    }} />
    <span style={{
      fontFamily:'DM Mono, monospace',
      fontSize:11,
      letterSpacing:'0.18em',
      textTransform:'uppercase',
      color:'#00C4FF'
    }}>
      Digital Agency · Tokyo, Japan
    </span>
  </motion.div>

  {/* Headline with scramble */}
  <h1 style={{
    fontFamily:'Bricolage Grotesque, sans-serif',
    fontWeight:800,
    lineHeight:0.88,
    letterSpacing:'-0.04em',
    fontSize:'clamp(54px, 7.5vw, 108px)',
    marginBottom: '1.5rem'
  }}>
    <span ref={line1Ref} style={{display:'block', color:'#ffffff'}}>
      We build
    </span>
    <span ref={line2Ref} style={{
      display:'block',
      WebkitTextStroke:'1.5px rgba(0,196,255,0.45)',
      WebkitTextFillColor:'transparent',
      color:'transparent'
    }}>
      digital
    </span>
    <span ref={line3Ref} style={{display:'block', color:'#ffffff'}}>
      products.
    </span>
  </h1>

  {/* Green accent bar */}
  <div className="flex items-center gap-3 mb-6">
    <div style={{
      height:1, width:64,
      background:'linear-gradient(to right, #39FF14, transparent)'
    }} />
    <span style={{
      fontFamily:'DM Mono, monospace',
      fontSize:12,
      color:'#39FF14',
      letterSpacing:'0.1em'
    }}>
      that actually work.
    </span>
  </div>

  {/* Subheadline */}
  <p id="hero-sub" style={{
    color:'rgba(255,255,255,0.38)',
    fontSize:16,
    lineHeight:1.7,
    maxWidth:420,
    marginBottom:'2.5rem',
    fontFamily:'Plus Jakarta Sans, sans-serif'
  }}>
    Not a template shop. Not a disappearing freelancer.
    Built in Tokyo, delivered globally.
  </p>

  {/* CTA Buttons */}
  <div id="hero-ctas" className="flex gap-4 flex-wrap mb-10">
    
    {/* Primary — electric blue gradient */}
    <a href="/contact" style={{
      display:'inline-flex',
      alignItems:'center',
      padding:'14px 32px',
      borderRadius:12,
      background:'linear-gradient(135deg, #00C4FF 0%, #0066FF 100%)',
      color:'#ffffff',
      fontWeight:700,
      fontSize:14,
      textDecoration:'none',
      boxShadow:'0 0 40px rgba(0,196,255,0.3), 0 0 80px rgba(0,196,255,0.1)',
      transition:'all 0.2s ease',
      letterSpacing:'0.01em'
    }}>
      Start a Project →
    </a>

    {/* Secondary — ghost green */}
    <a href="/work" style={{
      display:'inline-flex',
      alignItems:'center',
      padding:'14px 32px',
      borderRadius:12,
      background:'transparent',
      color:'#39FF14',
      fontWeight:600,
      fontSize:14,
      textDecoration:'none',
      border:'1px solid rgba(57,255,20,0.35)',
      transition:'all 0.2s ease',
      letterSpacing:'0.01em'
    }}>
      See our work
    </a>
  </div>

  {/* Trust metrics */}
  <div style={{display:'flex', gap:32, alignItems:'flex-start'}}>
    {[
      {value:'2+', label:'Live Projects', color:'#00C4FF'},
      {value:'100%', label:'Delivery Rate', color:'#39FF14'},
      {value:'1 Day', label:'Response Time', color:'#00C4FF'},
    ].map(stat => (
      <div key={stat.label}>
        <div style={{
          fontFamily:'Bricolage Grotesque, sans-serif',
          fontWeight:800,
          fontSize:22,
          color: stat.color,
          lineHeight:1,
          textShadow:`0 0 20px ${stat.color}60`
        }}>
          {stat.value}
        </div>
        <div style={{
          fontFamily:'DM Mono, monospace',
          fontSize:10,
          color:'rgba(255,255,255,0.28)',
          textTransform:'uppercase',
          letterSpacing:'0.12em',
          marginTop:4
        }}>
          {stat.label}
        </div>
      </div>
    ))}
  </div>

</div>
```

──────────────────────────────────
RIGHT COLUMN — Glass Terminal Card
──────────────────────────────────
Position: absolute right side, centered vertically
Width: 380px
Right edge: 5% from viewport right

```tsx
<motion.div
  initial={{opacity:0, x:40, y:10}}
  animate={{opacity:1, x:0, y:0}}
  transition={{duration:0.9, delay:1.4, ease:[0.22,1,0.36,1]}}
  style={{
    position:'absolute',
    right:'5%',
    top:'50%',
    transform:'translateY(-50%)',
    width:380,
    zIndex:10,
    
    /* Glass surface */
    background:'rgba(0,10,20,0.75)',
    backdropFilter:'blur(24px)',
    WebkitBackdropFilter:'blur(24px)',
    
    /* Electric blue border */
    border:'1px solid rgba(0,196,255,0.18)',
    borderRadius:16,
    overflow:'hidden',
    
    /* Outer glow */
    boxShadow:`
      0 0 0 1px rgba(0,196,255,0.06),
      0 32px 80px rgba(0,0,0,0.6),
      0 0 120px rgba(0,196,255,0.06),
      inset 0 1px 0 rgba(0,196,255,0.12)
    `
  }}
>
  {/* Terminal header bar */}
  <div style={{
    padding:'12px 16px',
    borderBottom:'1px solid rgba(0,196,255,0.1)',
    display:'flex',
    alignItems:'center',
    gap:8,
    background:'rgba(0,196,255,0.04)'
  }}>
    {/* Traffic lights */}
    <div style={{width:8,height:8,borderRadius:'50%',background:'rgba(255,255,255,0.15)'}}/>
    <div style={{width:8,height:8,borderRadius:'50%',background:'rgba(255,255,255,0.15)'}}/>
    <div style={{width:8,height:8,borderRadius:'50%',background:'rgba(57,255,20,0.6)',
                  boxShadow:'0 0 6px rgba(57,255,20,0.6)'}}/>
    <span style={{
      marginLeft:8,
      fontFamily:'DM Mono, monospace',
      fontSize:10,
      color:'rgba(0,196,255,0.6)',
      letterSpacing:'0.1em'
    }}>
      STUDIO.CYBICONZ — LIVE
    </span>
    {/* Pulsing live dot */}
    <div style={{
      marginLeft:'auto',
      width:6, height:6, borderRadius:'50%',
      background:'#39FF14',
      boxShadow:'0 0 8px #39FF14',
      animation:'pulse-dot 2s ease-in-out infinite'
    }}/>
  </div>

  {/* Terminal body */}
  <div style={{padding:'20px 20px 24px'}}>
    
    {/* Location line */}
    <div style={{
      display:'flex',
      alignItems:'center',
      gap:8,
      marginBottom:20
    }}>
      <span style={{
        fontFamily:'DM Mono, monospace',
        fontSize:10,
        color:'rgba(0,196,255,0.5)',
        letterSpacing:'0.1em'
      }}>
        📍 TOKYO, JAPAN  ·  EST. 2025
      </span>
    </div>

    {/* Service tags — what CybiconZ builds */}
    <div style={{
      display:'flex',
      flexWrap:'wrap',
      gap:6,
      marginBottom:24
    }}>
      {[
        'Website Dev',
        'E-Commerce', 
        'UI/UX Design',
        'Web Apps',
        'Digital Marketing'
      ].map((tag, i) => (
        <span key={tag} style={{
          fontFamily:'DM Mono, monospace',
          fontSize:10,
          padding:'4px 10px',
          borderRadius:4,
          border:`1px solid ${i===0||i===1 
            ? 'rgba(0,196,255,0.3)' 
            : 'rgba(255,255,255,0.08)'}`,
          color: i===0||i===1 
            ? '#00C4FF' 
            : 'rgba(255,255,255,0.35)',
          background: i===0||i===1 
            ? 'rgba(0,196,255,0.06)' 
            : 'transparent',
          letterSpacing:'0.06em'
        }}>
          {tag}
        </span>
      ))}
    </div>

    {/* Divider */}
    <div style={{
      height:1,
      background:'linear-gradient(to right, rgba(0,196,255,0.2), transparent)',
      marginBottom:20
    }}/>

    {/* Active projects */}
    <div style={{
      fontFamily:'DM Mono, monospace',
      fontSize:10,
      color:'rgba(0,196,255,0.5)',
      letterSpacing:'0.1em',
      marginBottom:12
    }}>
      ACTIVE PROJECTS
    </div>

    {/* Project 1 */}
    <div style={{marginBottom:16}}>
      <div style={{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:6
      }}>
        <span style={{
          fontFamily:'Plus Jakarta Sans, sans-serif',
          fontSize:13,
          fontWeight:600,
          color:'rgba(255,255,255,0.85)'
        }}>
          LwangBlack Coffee
        </span>
        <span style={{
          fontFamily:'DM Mono, monospace',
          fontSize:9,
          color:'#39FF14',
          background:'rgba(57,255,20,0.08)',
          border:'1px solid rgba(57,255,20,0.2)',
          padding:'2px 7px',
          borderRadius:3,
          letterSpacing:'0.08em'
        }}>
          BUILD
        </span>
      </div>
      {/* Progress bar */}
      <div style={{
        height:3,
        background:'rgba(255,255,255,0.06)',
        borderRadius:2,
        overflow:'hidden'
      }}>
        <motion.div
          initial={{width:0}}
          animate={{width:'72%'}}
          transition={{duration:1.2, delay:2.0, ease:[0.22,1,0.36,1]}}
          style={{
            height:'100%',
            background:'linear-gradient(to right, #00C4FF, #39FF14)',
            borderRadius:2,
            boxShadow:'0 0 8px rgba(0,196,255,0.5)'
          }}
        />
      </div>
      <div style={{
        fontFamily:'DM Mono, monospace',
        fontSize:9,
        color:'rgba(255,255,255,0.2)',
        marginTop:4,
        letterSpacing:'0.06em'
      }}>
        E-COMMERCE SYSTEM · 72%
      </div>
    </div>

    {/* Project 2 */}
    <div style={{marginBottom:20}}>
      <div style={{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:6
      }}>
        <span style={{
          fontFamily:'Plus Jakarta Sans, sans-serif',
          fontSize:13,
          fontWeight:600,
          color:'rgba(255,255,255,0.85)'
        }}>
          Johnnies Liquor
        </span>
        <span style={{
          fontFamily:'DM Mono, monospace',
          fontSize:9,
          color:'#00C4FF',
          background:'rgba(0,196,255,0.08)',
          border:'1px solid rgba(0,196,255,0.2)',
          padding:'2px 7px',
          borderRadius:3,
          letterSpacing:'0.08em'
        }}>
          REVIEW
        </span>
      </div>
      <div style={{
        height:3,
        background:'rgba(255,255,255,0.06)',
        borderRadius:2,
        overflow:'hidden'
      }}>
        <motion.div
          initial={{width:0}}
          animate={{width:'85%'}}
          transition={{duration:1.2, delay:2.3, ease:[0.22,1,0.36,1]}}
          style={{
            height:'100%',
            background:'linear-gradient(to right, #00C4FF, #0066FF)',
            borderRadius:2,
            boxShadow:'0 0 8px rgba(0,196,255,0.4)'
          }}
        />
      </div>
      <div style={{
        fontFamily:'DM Mono, monospace',
        fontSize:9,
        color:'rgba(255,255,255,0.2)',
        marginTop:4,
        letterSpacing:'0.06em'
      }}>
        WEBSITE + MARKETING · 85%
      </div>
    </div>

    {/* Divider */}
    <div style={{
      height:1,
      background:'rgba(255,255,255,0.05)',
      marginBottom:16
    }}/>

    {/* Bottom metrics row */}
    <div style={{display:'flex', gap:0}}>
      {[
        {label:'RESPONSE', value:'< 1 day', color:'#39FF14'},
        {label:'DELIVERED', value:'100%', color:'#00C4FF'},
        {label:'SINCE', value:'2025', color:'rgba(255,255,255,0.4)'},
      ].map((m, i) => (
        <div key={m.label} style={{
          flex:1,
          paddingRight: i < 2 ? 16 : 0,
          borderRight: i < 2 
            ? '1px solid rgba(255,255,255,0.06)' 
            : 'none',
          paddingLeft: i > 0 ? 16 : 0
        }}>
          <div style={{
            fontFamily:'DM Mono, monospace',
            fontSize:9,
            color:'rgba(255,255,255,0.25)',
            letterSpacing:'0.1em',
            marginBottom:3
          }}>
            {m.label}
          </div>
          <div style={{
            fontFamily:'Bricolage Grotesque, sans-serif',
            fontWeight:700,
            fontSize:14,
            color: m.color,
            textShadow: m.color !== 'rgba(255,255,255,0.4)' 
              ? `0 0 16px ${m.color}60` 
              : 'none'
          }}>
            {m.value}
          </div>
        </div>
      ))}
    </div>

  </div>
</motion.div>
```

──────────────────────────────────
SCROLL INDICATOR (bottom center)
──────────────────────────────────
Keep existing scroll indicator but update colors:
```tsx
<div className="scroll-indicator" style={{
  position:'absolute',
  bottom:32,
  left:'50%',
  transform:'translateX(-50%)',
  display:'flex',
  flexDirection:'column',
  alignItems:'center',
  gap:8,
  zIndex:10
}}>
  <span style={{
    fontFamily:'DM Mono, monospace',
    fontSize:10,
    color:'rgba(0,196,255,0.3)',
    letterSpacing:'0.2em',
    textTransform:'uppercase'
  }}>
    SCROLL
  </span>
  <motion.div
    animate={{scaleY:[1,1.6,1], opacity:[0.3,1,0.3]}}
    transition={{duration:2, repeat:Infinity, ease:'easeInOut'}}
    style={{
      width:1,
      height:32,
      background:'linear-gradient(to bottom, #00C4FF, transparent)'
    }}
  />
</div>
```

──────────────────────────────────
SCRAMBLE HOOK (add inside Hero.tsx)
──────────────────────────────────
function useScramble(text: string, startDelay: number = 0) {
  const ref = useRef<HTMLSpanElement>(null)
  
  useEffect(() => {
    const el = ref.current
    if (!el) return
    
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%0123456789'
    let frame = 0
    let timeoutId: ReturnType<typeof setTimeout>
    let intervalId: ReturnType<typeof setInterval>
    
    timeoutId = setTimeout(() => {
      const letters = text.toUpperCase().split('')
      let iteration = 0
      
      intervalId = setInterval(() => {
        el.innerText = letters
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iteration) return text[index]
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
        
        iteration += 0.35
        if (iteration > letters.length) {
          clearInterval(intervalId)
          el.innerText = text
        }
      }, 35)
    }, startDelay)
    
    return () => {
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }, [text, startDelay])
  
  return ref
}

// Usage in Hero component:
const line1Ref = useScramble('We build', 500)
const line2Ref = useScramble('digital', 800)
const line3Ref = useScramble('products.', 1100)

──────────────────────────────────
MOBILE RESPONSIVE (< 768px)
──────────────────────────────────
Below 768px:
- Left column: full width, centered text, padding 24px
- Terminal card: 
  - Width: calc(100% - 48px)
  - Position: relative (not absolute)
  - Shown BELOW the text content
  - Canvas opacity: 0.35 (so text is readable)
- Shield scale: 0.65 in canvas
- Font sizes: clamp handles naturally

Add to section:
@media (max-width: 768px) {
  The section becomes flex-direction: column
  Canvas is position: absolute, opacity 0.3
  Content stacks vertically with padding-top: 100px
}

════════════════════════════════════════════════════════
PART 3 — Color System Updates
════════════════════════════════════════════════════════

Update src/index.css — add these utilities alongside existing ones:
(DO NOT remove existing --accent-from etc, just add these)

:root {
  --brand-blue: #00C4FF;
  --brand-green: #39FF14;
  --brand-dark-blue: #0066FF;
  --hero-bg: #020408;
}

.text-brand-blue { color: var(--brand-blue); }
.text-brand-green { color: var(--brand-green); }
.shadow-blue { box-shadow: 0 0 30px rgba(0,196,255,0.35); }
.shadow-green { box-shadow: 0 0 30px rgba(57,255,20,0.25); }
.border-blue { border-color: rgba(0,196,255,0.25); }
.glow-text-blue { text-shadow: 0 0 20px rgba(0,196,255,0.5); }
.glow-text-green { text-shadow: 0 0 20px rgba(57,255,20,0.5); }

Also update the Logo component (src/components/site/Logo.tsx):
The "Z" gradient should use brand colors:
background: linear-gradient(135deg, #00C4FF, #39FF14)
(instead of the current indigo gradient)

════════════════════════════════════════════════════════
PART 4 — Remove / Clean up
════════════════════════════════════════════════════════

REMOVE from Hero.tsx:
- The old HeroCanvas import and its sphere-based logic
- The existing headlineRef GSAP clip-path reveal 
  (scramble replaces it)
- Keep: subheadline GSAP fade, CTA GSAP fade, 
  scroll indicator GSAP fade

The ParticleField component can be removed from Hero.tsx —
the Three.js scene handles all particles now.
```