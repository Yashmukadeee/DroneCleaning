import { Article, DroneHotspot } from '../types/blog';

export const ARTICLES_DATA: Article[] = [
  {
    id: 'glass-proof-radar',
    title: 'Precision Facade Sensing: Millimeter-Wave FMCW Radar Systems in High-Rise Robotics',
    slug: 'glass-proof-radar-facade-drone-cleaning',
    category: 'Technology',
    summary: 'Autonomous close-proximity flight along curtain-wall skyscrapers presents severe optical sensing challenges. This paper details how 77GHz Frequency-Modulated Continuous-Wave (FMCW) Doppler radar overcomes glass reflections and atmospheric distortion.',
    content: `
      <p class="lead text-xl text-slate-700 font-medium mb-6">
        Autonomous multi-rotor positioning within two meters of high-rise structural glazing requires sub-centimeter spatial accuracy. Traditional Visual Positioning Systems (VPS) and LiDAR architectures encounter critical failure modes when operating near reflective architectural coatings, tint films, and transparent glass.
      </p>

      <h3 class="text-2xl font-bold text-slate-900 mt-8 mb-4">The Optical Boundary Challenge in Urban Canyons</h3>
      <p class="mb-4 text-slate-600 leading-relaxed">
        High-rise curtain-wall facades incorporate specialized Low-Emissivity (Low-E) solar control glass and specular metal panels. When exposed to direct sunlight, these surfaces produce extreme optical glare, flooding camera sensors and introducing multi-path phase inaccuracies in near-infrared LiDAR signals. Furthermore, highly transparent vision panels permit laser beams to pass directly into building interiors, resulting in false distance readings to internal structural columns rather than the exterior facade.
      </p>

      <div class="bg-sky-50 border-l-4 border-sky-600 p-5 rounded-r-xl my-6">
        <h4 class="font-bold text-sky-900 mb-1">Architectural Sensing Breakthrough</h4>
        <p class="text-sky-800 text-sm">
          By operating in the 77–81 GHz millimeter-wave spectrum, FMCW radar modules utilize high-frequency electromagnetic signals that reflect cleanly off metallic aluminum mullions and glass surface boundaries regardless of optical transparency, solar angle, or surface wetness.
        </p>
      </div>

      <h3 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Closed-Loop Standoff Control & Wind Sheer Compensation</h3>
      <p class="mb-4 text-slate-600 leading-relaxed">
        To maintain an optimal spray pattern and prevent hydro-dynamic back-thrust instability, the aircraft must maintain a constant 1.20-meter standoff distance. The dual-axis gimbaled FMCW radar streams 200 Hz range and velocity vectors to the flight controller, enabling dynamic motor thrust adjustments that compensate for localized wind shear up to 35 knots (18 m/s).
      </p>

      <h3 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Simulated Flight Modeling & Target Performance</h3>
      <p class="mb-4 text-slate-600 leading-relaxed">
        Computer flight simulations modeled across a 220-meter curtain-wall glass tower indicate that 77GHz FMCW radar feedback can maintain sub-centimeter standoff precision within ±8 millimeters under simulated turbulent gusts up to 35 knots (18 m/s).
      </p>
    `,
    keyTakeaways: [
      '77GHz FMCW Radar eliminates optical interference from specular glass reflections and Low-E thermal coatings.',
      '200 Hz position update loop provides sub-centimeter standoff precision under severe turbulent wind shear.',
      'Prevents phase-pass errors inherent to near-infrared LiDAR and visual camera navigation systems.',
      'Stabilizes aircraft aerodynamics against high-pressure spray nozzle back-thrust.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1579820010410-c10411aaaa88?q=80&w=2097&auto=format&fit=crop',
    readTime: '6 min read',
    publishDate: 'August 12, 2026',
    author: {
      name: 'Yash Mukade',
      role: 'Robotics & Facade Automation Specialist',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop',
      location: ''
    },
    likes: 142,
    featured: true,
    tags: ['Radar Systems', 'FMCW Technology', 'Facade Robotics', 'Avionics']
  },
  {
    id: 'zero-scrubbing-deionized-water',
    title: 'Physicochemical Principles of Pure-Water Soft Washing in Architectural Maintenance',
    slug: 'zero-scrubbing-deionized-water-soft-wash',
    category: 'Process',
    summary: 'Autonomous facade cleaning replaces mechanical squeegee friction with high-volume, zero-TDS deionized water chemistry. This analysis explores ion dissolution dynamics and streak-free evaporation physics.',
    content: `
      <p class="lead text-xl text-slate-700 font-medium mb-6">
        Manual window cleaning methods rely heavily on mechanical shear stress via rubber squeegees and chemical surfactants to dislodge soot, mineral salts, and organic particulate. Aerial robotic cleaning utilizes a superior chemical principle: hyper-purified water solvency.
      </p>

      <h3 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Thermodynamics of Total Dissolved Solids (TDS) Reduction</h3>
      <p class="mb-4 text-slate-600 leading-relaxed">
        Municipal water supplies typically contain 150 to 450 PPM (parts per million) of dissolved inorganic ions, including calcium, magnesium, silicates, and carbonates. When standard tap water evaporates from a surface, these dissolved compounds precipitate into crystalline mineral deposits, causing visible water spotting and etching over time.
      </p>

      <p class="mb-4 text-slate-600 leading-relaxed">
        Through a multi-stage ground purification sequence—incorporating 5-micron sediment filtration, dual-stage Reverse Osmosis (RO) membranes, and nuclear-grade Deionization (DI) resin beds—water purity is maintained at exactly <strong>0 PPM TDS (18.2 MΩ·cm resistivity)</strong> prior to pumping up the tether cable.
      </p>

      <div class="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-xl my-6">
        <h4 class="font-bold text-amber-900 mb-1">Ion Dissolution Dynamics</h4>
        <p class="text-amber-800 text-sm">
          Water at 0 PPM TDS possesses an extraordinary chemical potential gradient. Devoid of dissolved ions, it acts as an aggressive natural solvent, rapidly hydrolyzing and encapsulating atmospheric particulates, hydrocarbons, and surface salts without requiring synthetic detergents.
        </p>
      </div>

      <h3 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Controlled Atomization & Spot-Free Phase Change</h3>
      <p class="mb-4 text-slate-600 leading-relaxed">
        The airborne nozzle assembly atomizes pure water at 2,000–2,500 PSI, delivering high kinetic energy directly to the glass substrate. Following the wash cycle, residual pure water droplets evaporate completely into ambient air, leaving zero chemical residue or mineral spots behind.
      </p>
    `,
    keyTakeaways: [
      '0 PPM TDS water acts as an aggressive natural solvent, eliminating the need for soap or synthetic surfactants.',
      'Prevents mineral precipitation, glass etching, and hydrophobic architectural coating damage.',
      'Controlled spray atomization flushes particulate matter without requiring abrasive mechanical brushes.',
      'Eco-friendly run-off protects building landscaping and ground-level stormwater drains.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1541888086925-920a0b23023e?q=80&w=2070&auto=format&fit=crop',
    readTime: '5 min read',
    publishDate: 'August 08, 2026',
    author: {
      name: 'Yash Mukade',
      role: 'Robotics & Facade Automation Specialist',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop',
      location: ''
    },
    likes: 98,
    featured: false,
    tags: ['Deionized Water', 'Soft Washing', 'Fluid Engineering', 'Sustainability']
  },
  {
    id: 'economics-tethered-systems',
    title: 'Capital Operations & Comparative Risk Modeling for High-Rise Building Maintenance',
    slug: 'financial-economics-tethered-drone-cleaning-systems',
    category: 'Business',
    summary: 'An economic evaluation comparing traditional suspended scaffold operations against tethered robotic cleaning systems, focusing on labor velocity, insurance risk premiums, and capital payback periods.',
    content: `
      <p class="lead text-xl text-slate-700 font-medium mb-6">
        Asset managers and facility management directors overseeing super-tall commercial properties face significant financial headwinds driven by labor costs, equipment staging delays, and escalating occupational safety liabilities. Robotic facade maintenance represents a structural shift in facility economics.
      </p>

      <h3 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Operational Efficiency & Staging Speed Comparison</h3>
      <p class="mb-4 text-slate-600 leading-relaxed">
        Deploying manual swing stages (gondolas) on a 200-meter skyscraper requires 16 to 24 crew-hours for rigging, counterweight calibration, and roof anchor safety verification. In contrast, a mobile ground-tethered drone platform achieves full operational readiness in 15 minutes.
      </p>

      <div class="overflow-x-auto my-6">
        <table class="w-full text-left border-collapse bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
          <thead>
            <tr class="bg-sky-600 text-white text-sm">
              <th class="p-3.5">Key Performance Indicator</th>
              <th class="p-3.5">Manual Gondola Staging</th>
              <th class="p-3.5">Tethered Robotic Platform</th>
            </tr>
          </thead>
          <tbody class="text-sm divide-y divide-slate-200 text-slate-700">
            <tr>
              <td class="p-3.5 font-semibold">Deployment Setup Time</td>
              <td class="p-3.5 text-red-600 font-medium">12–24 Hours</td>
              <td class="p-3.5 text-emerald-600 font-bold">15 Minutes</td>
            </tr>
            <tr>
              <td class="p-3.5 font-semibold">Daily Facade Clearance Velocity</td>
              <td class="p-3.5">350 m² / day</td>
              <td class="p-3.5 text-emerald-600 font-bold">3,500 m² / day (10x)</td>
            </tr>
            <tr>
              <td class="p-3.5 font-semibold">Operational Personnel Required</td>
              <td class="p-3.5">4–6 Altitude Technicians</td>
              <td class="p-3.5 text-emerald-600 font-bold">2 Ground Pilots</td>
            </tr>
            <tr>
              <td class="p-3.5 font-semibold">Workers' Compensation Surcharge</td>
              <td class="p-3.5 text-red-600 font-medium">High Hazard Rate</td>
              <td class="p-3.5 text-emerald-600 font-bold">Standard Ground Rate</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Risk Mitigation & Financial Payback Modeling</h3>
      <p class="mb-4 text-slate-600 leading-relaxed">
        High-rise altitude insurance premiums account for up to 35% of total annual facade maintenance budgets. By transitioning technical personnel from rooftop swing stages to ground control units, asset operators mitigate human fall hazards entirely while achieving complete capital equipment payback within 8 to 14 operational months.
      </p>
    `,
    keyTakeaways: [
      '10x higher surface area processing speed compared to legacy manual swing stages.',
      'Reduces required crew size from 6 high-altitude technicians to 2 certified ground operators.',
      'Eliminates high-hazard workers compensation insurance surcharges.',
      'Delivers full capital acquisition ROI within 8 to 14 months of deployment.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=2070&auto=format&fit=crop',
    readTime: '7 min read',
    publishDate: 'August 03, 2026',
    author: {
      name: 'Yash Mukade',
      role: 'Robotics & Facade Automation Specialist',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop',
      location: ''
    },
    likes: 115,
    featured: false,
    tags: ['ROI Analysis', 'Facility Management', 'Economics', 'Operations']
  },
  {
    id: 'tethered-power-high-pressure-fluid',
    title: 'High-Voltage Umbilical Cables: Power Transmission & High-Pressure Fluid Dynamics',
    slug: 'dual-channel-tether-engineering-drone-power-fluid',
    category: 'Technology',
    summary: 'Continuous flight operation requires continuous energy and fluid transmission. This paper details the structural engineering of composite micro-tethers delivering 800V DC and 2,500 PSI water volume.',
    content: `
      <p class="lead text-xl text-slate-700 font-medium mb-6">
        Untethered lithium-polymer battery drones are constrained by strict payload-to-flight-time limits, capping endurance at 20 to 30 minutes. To maintain continuous 8-hour shift operations at altitudes up to 400 meters, facade robots utilize composite power-fluid umbilical tethers.
      </p>

      <h3 class="text-2xl font-bold text-slate-900 mt-8 mb-4">800V DC Power Step-Down System</h3>
      <p class="mb-4 text-slate-600 leading-relaxed">
        Transmitting high electric current over 300 meters at low voltages (such as 48V) induces severe resistive line losses ($I^2R$). Ground stations rectify 3-phase grid power to 800V DC, allowing ultra-thin copper-clad aluminum conductors to be used, maintaining total tether weight under 45 grams per meter.
      </p>

      <h3 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Kevlar Reinforcement & Pressure Conduits</h3>
      <p class="mb-4 text-slate-600 leading-relaxed">
        Coaxial to the electrical lines is a high-tensile thermoplastic polyurethane (TPU) fluid hose rated for 2,500 PSI working pressure. A surrounding woven Kevlar strain-relief sleeve provides a 500 kg breaking strength, serving as a mechanical safety retention line anchored to the ground winch.
      </p>
    `,
    keyTakeaways: [
      '800V DC transmission minimizes tether conductor mass to under 45g per meter.',
      'Enables continuous 8-hour flight shifts without battery landing cycles.',
      'Integrated Kevlar braided jacket provides 500kg mechanical tensile safety rating.',
      'Automated ground winch maintains dynamic tether tension during wind variations.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2070&auto=format&fit=crop',
    readTime: '6 min read',
    publishDate: 'July 28, 2026',
    author: {
      name: 'Yash Mukade',
      role: 'Robotics & Facade Automation Specialist',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop',
      location: ''
    },
    likes: 84,
    featured: false,
    tags: ['Tether Technology', 'Power Engineering', 'Avionics', 'Fluid Systems']
  },
  {
    id: 'safety-regulations-urban-flight',
    title: 'Aviation Regulatory Frameworks & Fail-Safe Integration for Dense Urban Flight',
    slug: 'safety-regulations-urban-airspace-facade-drones',
    category: 'Safety & Regulations',
    summary: 'A regulatory analysis of civil aviation compliance, tethered RPAS exemptions under FAA Part 107 and DGCA rules, automated geo-fencing, and emergency recovery parachutes.',
    content: `
      <p class="lead text-xl text-slate-700 font-medium mb-6">
        Deploying high-thrust robotic multirotors in dense metropolitan environments mandates rigorous safety compliance across civil aviation authorities such as the FAA (Federal Aviation Administration) and DGCA (Directorate General of Civil Aviation).
      </p>

      <h3 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Tethered RPAS Airspace Classifications</h3>
      <p class="mb-4 text-slate-600 leading-relaxed">
        Because tethered facade drones are physically tethered to a certified ground winch with physical altitude hard-stops, regulatory bodies classify them under streamlined operational waiver frameworks (such as FAA Part 107.39 waivers for flight over people and DGCA Tethered RPAS rules).
      </p>

      <h3 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Multi-Tier Emergency Recovery Avionics</h3>
      <p class="mb-4 text-slate-600 leading-relaxed">
        In the event of total utility power disruption, an onboard emergency lithium backup battery supplies 4 minutes of controlled descent power. Simultaneously, an independent ballistic parachute system automatically deploys within 400 milliseconds if pitch or roll telemetry exceeds 45 degrees.
      </p>
    `,
    keyTakeaways: [
      'Tethered status streamlines municipal, urban building, and civil aviation flight permits.',
      'Multi-tier redundant avionics guarantee ground safety over pedestrian thoroughfares.',
      'Automated 3D geo-fencing restricts lateral and vertical flight envelopes.',
      'Ballistic emergency parachutes deploy in sub-400ms anomaly windows.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=2070&auto=format&fit=crop',
    readTime: '8 min read',
    publishDate: 'July 20, 2026',
    author: {
      name: 'Yash Mukade',
      role: 'Robotics & Facade Automation Specialist',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop',
      location: ''
    },
    likes: 76,
    featured: false,
    tags: ['Aviation Regulations', 'Compliance', 'Flight Safety', 'Airspace Standards']
  },
  {
    id: 'thermal-anomaly-ai-inspection',
    title: 'Thermal Anomaly Detection & Edge-AI Defect Mapping in Glass Curtain Walls',
    slug: 'thermal-anomaly-edge-ai-defect-mapping',
    category: 'Technology',
    summary: 'Integrating radiometric thermal micro-bolometers with edge-AI inference enables simultaneous autonomous facade cleaning and structural health diagnostics, identifying insulation leaks, micro-cracks, and seal degradation.',
    content: `
      <p class="lead text-xl text-slate-700 font-medium mb-6">
        While traditional window cleaning is purely cosmetic, robotic facade flight presents a unique opportunity for multi-spectral asset inspection. By mounting long-wave infrared (LWIR) radiometric thermal cameras alongside high-pressure wash nozzles, drones generate high-definition thermographic point clouds of the entire building envelope.
      </p>

      <h3 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Radiometric Thermography at 60 FPS</h3>
      <p class="mb-4 text-slate-600 leading-relaxed">
        Curtain-wall glazing assemblies regularly suffer from argon gas depletion in double-glazed units (IGUs), silicone weather-seal oxidation, and structural anchor thermal bridging. An uncooled VOX microbolometer (640x512, ≤40 mK thermal sensitivity) captures differential thermal signatures across every individual glass pane during normal wash ascent.
      </p>

      <div class="bg-purple-50 border-l-4 border-purple-600 p-5 rounded-r-xl my-6">
        <h4 class="font-bold text-purple-900 mb-1">On-Device Edge AI Computer Vision</h4>
        <p class="text-purple-800 text-sm">
          An onboard neural processing unit (NPU) running quantized YOLO-based segmentation models flags anomalous thermal gradients in real time, automatically geo-tagging coordinate bounding boxes and transmitting immediate structural defect alerts to facility engineers.
        </p>
      </div>

      <h3 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Building Lifecycle Management Integration</h3>
      <p class="mb-4 text-slate-600 leading-relaxed">
        Inspection logs automatically compile into industry-standard BIM (Building Information Modeling) formats (IFC / Revit), allowing asset owners to track glazing seal degradation over years and optimize preventive maintenance budgets before catastrophic seal failure occurs.
      </p>
    `,
    keyTakeaways: [
      'Simultaneous facade wash and infrared structural inspection saves up to $150,000 in standalone diagnostic surveys.',
      '≤40 mK thermal sensitivity identifies sub-surface moisture ingress, IGU gas loss, and thermal bridging.',
      'Onboard edge-NPU processes defect segmentation in real time at 60 FPS.',
      'Direct synchronization into BIM / Revit digital twin asset management software.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop',
    readTime: '7 min read',
    publishDate: 'July 14, 2026',
    author: {
      name: 'Yash Mukade',
      role: 'Robotics & Facade Automation Specialist',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop',
      location: ''
    },
    likes: 129,
    featured: false,
    tags: ['Thermal Vision', 'Edge AI', 'Defect Mapping', 'Building Information Modeling']
  }
];

export const DRONE_HOTSPOTS: DroneHotspot[] = [
  {
    id: 'radar-sensor',
    title: '77GHz Glass-Proof Radar',
    description: 'FMCW Millimeter-Wave radar module ignores optical reflections and transparent glass pass-through for sub-centimeter facade distance locking.',
    xPercent: 32,
    yPercent: 42,
    specs: ['77 GHz FMCW Wave', '200 Hz Position Refresh', '0.5 cm Standoff Precision'],
    icon: 'Radar'
  },
  {
    id: 'water-nozzle',
    title: 'Atomized DI Water Nozzle',
    description: 'Adjustable pressure nozzle spraying 0 PPM total dissolved solids deionized water for instant spot-free drying without squeegee friction.',
    xPercent: 55,
    yPercent: 28,
    specs: ['2,500 PSI Max Pressure', '0 PPM Water Purity', 'Dual Swivel Actuator'],
    icon: 'Droplets'
  },
  {
    id: 'power-tether',
    title: '800V DC / Fluid Composite Tether',
    description: 'High-voltage lightweight power wire coupled with Kevlar-sheathed fluid hose delivering continuous energy and high-volume purified water.',
    xPercent: 50,
    yPercent: 82,
    specs: ['800 Volt DC Grid', '45g / meter Weight', '500kg Tensile Rating'],
    icon: 'Zap'
  },
  {
    id: 'flight-controller',
    title: 'Triple-Redundant Flight Core',
    description: 'Real-time telemetry controller managing multi-axis thrust compensation against 35-knot wind gusts.',
    xPercent: 68,
    yPercent: 48,
    specs: ['Triple IMU Redundancy', 'Auto Wind Compensation', 'Ballistic Parachute Trigger'],
    icon: 'Cpu'
  }
];
