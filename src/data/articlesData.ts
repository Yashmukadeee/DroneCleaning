import { Article, DroneHotspot } from '../types/blog';

export const ARTICLES_DATA: Article[] = [
  {
    id: 'why-wind-gets-rough-near-tall-buildings',
    title: 'Why Wind Gets Rough Near Tall Buildings — and How the Drone Rides It Out',
    slug: 'why-wind-gets-rough-near-tall-buildings',
    category: 'Technology',
    summary: "Wind doesn't move past a skyscraper the way it moves across open ground. When it hits the face of a tall building, part of it gets pushed straight down toward the street — engineers call this a downdraft — and part of it speeds up sharply as it wraps around the corners, a well-documented effect in wind engineering that gets stronger the higher up you go. That's exactly where a facade-cleaning drone has to work. The standard engineering answer is feedback control: the drone reads its own tilt, speed, and distance from the glass many times per second through onboard sensors, and continuously adjusts each rotor's thrust to correct for gusts before they push it off course — the same core idea (a fast feedback loop, commonly a PID controller) used in most stable drones today, just tuned for the extra turbulence a building surface creates. It's a genuinely active area of drone research, not a solved problem.",
    content: "Wind doesn't move past a skyscraper the way it moves across open ground. When it hits the face of a tall building, part of it gets pushed straight down toward the street — engineers call this a downdraft — and part of it speeds up sharply as it wraps around the corners, a well-documented effect in wind engineering that gets stronger the higher up you go. That's exactly where a facade-cleaning drone has to work. The standard engineering answer is feedback control: the drone reads its own tilt, speed, and distance from the glass many times per second through onboard sensors, and continuously adjusts each rotor's thrust to correct for gusts before they push it off course — the same core idea (a fast feedback loop, commonly a PID controller) used in most stable drones today, just tuned for the extra turbulence a building surface creates. It's a genuinely active area of drone research, not a solved problem.",
    keyTakeaways: [
      'Skyscraper wind geometry creates strong downward drafts and corner acceleration zones.',
      'High-speed feedback loops continuously adjust individual rotor thrust against gusts.',
      'Onboard distance and tilt sensors keep the drone stable along the glass surface.'
    ],
    imageUrl: '/images/drone_facade.png',
    readTime: '~2 min read',
    publishDate: 'August 14, 2026',
    author: {
      name: 'Yash Mukade',
      role: 'Robotics & Facade Automation Specialist',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop',
      location: ''
    },
    featured: true,
    tags: ['WindEngineering', 'FlightControl', 'FacadeRobotics']
  },
  {
    id: 'concept-cleaning-solar-farms',
    title: 'Concept: Cleaning Solar Farms by Drone in Dusty, Desert Regions',
    slug: 'concept-cleaning-solar-farms-by-drone-in-dusty-desert-regions',
    category: 'Case Studies',
    summary: "Solar panels lose power output as dust settles on the glass — a well-known problem in the solar industry called soiling, worst in dry regions where rain rarely washes panels clean on its own. Published studies on desert solar sites report a wide range of losses, from under 5% to as much as 40% of output over a dry season, depending heavily on the site's dust levels and rainfall. Regular cleaning recovers most of that lost power. Today that cleaning is usually done with truck-mounted brushes or manual crews using a lot of water — slow at utility scale, and expensive in exactly the desert regions where water is scarce. The idea here is a small fleet of drones that clean panels using far less water each, working a routine schedule across a large site faster than ground crews could manage.",
    content: "Solar panels lose power output as dust settles on the glass — a well-known problem in the solar industry called soiling, worst in dry regions where rain rarely washes panels clean on its own. Published studies on desert solar sites report a wide range of losses, from under 5% to as much as 40% of output over a dry season, depending heavily on the site's dust levels and rainfall. Regular cleaning recovers most of that lost power. Today that cleaning is usually done with truck-mounted brushes or manual crews using a lot of water — slow at utility scale, and expensive in exactly the desert regions where water is scarce. The idea here is a small fleet of drones that clean panels using far less water each, working a routine schedule across a large site faster than ground crews could manage.",
    keyTakeaways: [
      'Dust accumulation in arid climates can reduce solar power output by 5% to 40% over dry periods.',
      'Water scarcity makes traditional tractor and manual washing expensive at utility scale.',
      'Autonomous aerial swarms can clean large arrays on a routine schedule using minimal water volume.'
    ],
    imageUrl: '/images/deionized_wash.png',
    readTime: '~2 min read',
    publishDate: 'August 10, 2026',
    author: {
      name: 'Yash Mukade',
      role: 'Robotics & Facade Automation Specialist',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop',
      location: ''
    },
    featured: true,
    tags: ['SolarEnergy', 'CleanTech', 'AutonomousDrones']
  },
  {
    id: 'glass-proof-radar',
    title: 'How Radar Lets Drones See Glass When Cameras and Lasers Fail',
    slug: 'glass-proof-radar-facade-drone-cleaning',
    category: 'Technology',
    summary: 'Autonomous close-proximity flight along curtain-wall skyscrapers presents unique optical challenges. Standard visual cameras are easily blinded by direct sunlight glare and specular window reflections, while LiDAR lasers pass straight through transparent glass and measure the distance to interior office walls instead of the exterior window. To maintain a safe standoff distance, facade drones use millimeter-wave radar sensors—the same radio-wave technology used in automotive collision avoidance. High-frequency radar signals bounce cleanly off glass panes and aluminum window mullions regardless of sunlight angles, window tint, or water spray, allowing the onboard flight controller to hold a stable, steady distance from the glass surface while cleaning.',
    content: 'Autonomous close-proximity flight along curtain-wall skyscrapers presents unique optical challenges. Standard visual cameras are easily blinded by direct sunlight glare and specular window reflections, while LiDAR lasers pass straight through transparent glass and measure the distance to interior office walls instead of the exterior window. To maintain a safe standoff distance, facade drones use millimeter-wave radar sensors—the same radio-wave technology used in automotive collision avoidance. High-frequency radar signals bounce cleanly off glass panes and aluminum window mullions regardless of sunlight angles, window tint, or water spray, allowing the onboard flight controller to hold a stable, steady distance from the glass surface while cleaning.',
    keyTakeaways: [
      'Millimeter-wave radar ignores sunlight glare, window tint, and transparent glass pass-through.',
      'Radio waves reflect off glass surfaces and aluminum frames to measure true facade distance.',
      'Maintains consistent standoff positioning without optical sensor interference.'
    ],
    imageUrl: '/images/glass_radar.png',
    readTime: '~2 min read',
    publishDate: 'August 06, 2026',
    author: {
      name: 'Yash Mukade',
      role: 'Robotics & Facade Automation Specialist',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop',
      location: ''
    },
    featured: false,
    tags: ['RadarSensing', 'GlassDetection', 'FacadeRobotics']
  },
  {
    id: 'zero-scrubbing-deionized-water',
    title: 'Spotless Windows Without Soap: The Chemistry of Deionized Water',
    slug: 'zero-scrubbing-deionized-water-soft-wash',
    category: 'Process',
    summary: 'Tap water contains dissolved mineral ions like calcium and magnesium that leave behind white spots and mineral scale when water evaporates. Traditional cleaners prevent this with soap and squeegees, but detergents leave a microscopic sticky film that attracts airborne dirt right back. Robotic facade washing replaces soap with deionized water—water filtered through sediment filters, reverse-osmosis membranes, and resin beds to strip away dissolved minerals. Devoid of ions, hyper-pure water acts as an active natural solvent that dissolves and lifts dust, soot, and mineral salts on contact. The drone sprays this pure water at a gentle, low pressure (roughly 60 to 150 PSI) to rinse dirt away, allowing the facade to dry completely spot-free in ambient air.',
    content: 'Tap water contains dissolved mineral ions like calcium and magnesium that leave behind white spots and mineral scale when water evaporates. Traditional cleaners prevent this with soap and squeegees, but detergents leave a microscopic sticky film that attracts airborne dirt right back. Robotic facade washing replaces soap with deionized water—water filtered through sediment filters, reverse-osmosis membranes, and resin beds to strip away dissolved minerals. Devoid of ions, hyper-pure water acts as an active natural solvent that dissolves and lifts dust, soot, and mineral salts on contact. The drone sprays this pure water at a gentle, low pressure (roughly 60 to 150 PSI) to rinse dirt away, allowing the facade to dry completely spot-free in ambient air.',
    keyTakeaways: [
      'Deionized pure water acts as a natural solvent, dissolving surface dust without detergents.',
      'Eliminates mineral spotting and sticky chemical residues that attract new grime.',
      'Low-pressure soft washing rinses surfaces cleanly without abrasive brushes.'
    ],
    imageUrl: '/images/deionized_wash.png',
    readTime: '~2 min read',
    publishDate: 'July 30, 2026',
    author: {
      name: 'Yash Mukade',
      role: 'Robotics & Facade Automation Specialist',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop',
      location: ''
    },
    featured: false,
    tags: ['PureWater', 'SoftWash', 'GreenCleaning']
  },
  {
    id: 'economics-tethered-systems',
    title: 'Why High-Rise Maintenance is Moving from Scaffolds to Ground-Tethered Drones',
    slug: 'financial-economics-tethered-drone-cleaning-systems',
    category: 'Business',
    summary: 'Washing skyscraper windows using traditional suspended swing stages (gondolas) is slow and hazardous. Staging a manual gondola system requires heavy rooftop rigging, counterweights, and safety checks that can take an entire crew half a day before washing begins. High-altitude liability insurance and hazard compensation also represent a substantial portion of annual facade upkeep overhead. A mobile ground-tethered drone platform deploys from street level in approximately 15 minutes. Two certified ground operators can process significantly more window area per shift than scaffold crews, reaching architectural overhangs gondolas cannot access while eliminating high-altitude worker fall risks entirely.',
    content: 'Washing skyscraper windows using traditional suspended swing stages (gondolas) is slow and hazardous. Staging a manual gondola system requires heavy rooftop rigging, counterweights, and safety checks that can take an entire crew half a day before washing begins. High-altitude liability insurance and hazard compensation also represent a substantial portion of annual facade upkeep overhead. A mobile ground-tethered drone platform deploys from street level in approximately 15 minutes. Two certified ground operators can process significantly more window area per shift than scaffold crews, reaching architectural overhangs gondolas cannot access while eliminating high-altitude worker fall risks entirely.',
    keyTakeaways: [
      'Ground setup takes ~15 minutes compared to hours of manual scaffold rigging.',
      'Significantly faster daily surface coverage reduces labor hours and disruption.',
      'Removes personnel from high-altitude swing stages to eliminate human fall risks.'
    ],
    imageUrl: '/images/drone_facade.png',
    readTime: '~2 min read',
    publishDate: 'July 24, 2026',
    author: {
      name: 'Yash Mukade',
      role: 'Robotics & Facade Automation Specialist',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop',
      location: ''
    },
    featured: false,
    tags: ['FacilityEconomics', 'RiskMitigation', 'Automation']
  },
  {
    id: 'tethered-power-high-pressure-fluid',
    title: 'Power and Water in One Line: The Engineering of Umbilical Tethers',
    slug: 'dual-channel-tether-engineering-drone-power-fluid',
    category: 'Technology',
    summary: "Battery-powered drones are strictly limited to 20 to 30 minutes of flight time before needing a battery swap, making high-rise maintenance impractical. A tethered drone solves this by connecting to a ground station via a single composite umbilical cable. High-voltage electricity is transmitted up the line to minimize power loss over hundreds of feet, and an onboard converter steps it down to power the drone's motors continuously for hours. Bundled inside the same lightweight, Kevlar-reinforced sleeve is a high-strength flexible hose delivering purified water from the ground pump. An automated ground winch dynamically manages tether tension, keeping the line taut and clear of building corners.",
    content: "Battery-powered drones are strictly limited to 20 to 30 minutes of flight time before needing a battery swap, making high-rise maintenance impractical. A tethered drone solves this by connecting to a ground station via a single composite umbilical cable. High-voltage electricity is transmitted up the line to minimize power loss over hundreds of feet, and an onboard converter steps it down to power the drone's motors continuously for hours. Bundled inside the same lightweight, Kevlar-reinforced sleeve is a high-strength flexible hose delivering purified water from the ground pump. An automated ground winch dynamically manages tether tension, keeping the line taut and clear of building corners.",
    keyTakeaways: [
      'High-voltage power transmission over thin cables enables continuous multi-hour flight.',
      'Integrated fluid hose delivers ground-filtered pure water directly to airborne nozzles.',
      'Automated ground winch dynamically maintains line tension to avoid facade snagging.'
    ],
    imageUrl: '/images/tether_cable.png',
    readTime: '~2 min read',
    publishDate: 'July 18, 2026',
    author: {
      name: 'Yash Mukade',
      role: 'Robotics & Facade Automation Specialist',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop',
      location: ''
    },
    featured: false,
    tags: ['TetherDesign', 'PowerDelivery', 'ContinuousFlight']
  },
  {
    id: 'safety-regulations-urban-flight',
    title: 'Navigating Urban Airspace: Safety and Regulatory Frameworks for Tethered Flight',
    slug: 'safety-regulations-urban-airspace-facade-drones',
    category: 'Safety & Regulations',
    summary: 'Operating drones in dense metropolitan centers requires strict adherence to civil aviation safety regulations. Free-flying drones face heavy restrictions over pedestrians because a lost signal or motor issue could cause a fly-away. Tethered drones benefit from a clearer regulatory path under frameworks like FAA Part 107 Subpart D (Operations Over People): because the aircraft is physically anchored to a certified ground winch with mechanical altitude hard-stops, it cannot drift into surrounding airspace or wander into nearby air traffic. Onboard fail-safes include backup battery reserves for controlled descent if ground power drops, 3D geo-fencing to bound movement, and automated ballistic emergency parachutes.',
    content: 'Operating drones in dense metropolitan centers requires strict adherence to civil aviation safety regulations. Free-flying drones face heavy restrictions over pedestrians because a lost signal or motor issue could cause a fly-away. Tethered drones benefit from a clearer regulatory path under frameworks like FAA Part 107 Subpart D (Operations Over People): because the aircraft is physically anchored to a certified ground winch with mechanical altitude hard-stops, it cannot drift into surrounding airspace or wander into nearby air traffic. Onboard fail-safes include backup battery reserves for controlled descent if ground power drops, 3D geo-fencing to bound movement, and automated ballistic emergency parachutes.',
    keyTakeaways: [
      'Physical ground anchoring simplifies airspace compliance and flight over people waivers.',
      'Mechanical tether hard-stops physically restrict aircraft from drifting into urban traffic.',
      'Multi-tier avionics include backup batteries, 3D geo-fencing, and emergency parachutes.'
    ],
    imageUrl: '/images/drone_facade.png',
    readTime: '~2 min read',
    publishDate: 'July 12, 2026',
    author: {
      name: 'Yash Mukade',
      role: 'Robotics & Facade Automation Specialist',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop',
      location: ''
    },
    featured: false,
    tags: ['AirspaceRules', 'FlightSafety', 'UrbanCompliance']
  }
];

export const DRONE_HOTSPOTS: DroneHotspot[] = [
  {
    id: 'radar-sensor',
    title: '77GHz Glass-Proof Radar',
    description: 'FMCW Millimeter-Wave radar module ignores optical reflections and transparent glass pass-through for reliable facade distance locking.',
    xPercent: 32,
    yPercent: 42,
    specs: ['77 GHz Millimeter-Wave Radar', 'Real-Time Dynamic Refresh', 'Sub-Centimeter Standoff Lock'],
    icon: 'Radar'
  },
  {
    id: 'water-nozzle',
    title: 'Atomized DI Water Nozzle',
    description: 'Adjustable low-pressure nozzle spraying pure deionized water for instant spot-free drying without squeegee friction.',
    xPercent: 55,
    yPercent: 28,
    specs: ['60–150 PSI Soft Wash', 'Zero Chemical Residue', 'Dual Swivel Actuator'],
    icon: 'Droplets'
  },
  {
    id: 'power-tether',
    title: 'High-Voltage Power & Fluid Composite Tether',
    description: 'High-voltage lightweight power wire coupled with Kevlar-sheathed fluid hose delivering continuous energy and purified water.',
    xPercent: 50,
    yPercent: 82,
    specs: ['Continuous Ground Power', 'Ultra-Lightweight Conduit', 'High Tensile Kevlar Core'],
    icon: 'Zap'
  },
  {
    id: 'flight-controller',
    title: 'Triple-Redundant Flight Core',
    description: 'Real-time telemetry controller managing multi-axis thrust compensation against wind gusts near building surfaces.',
    xPercent: 68,
    yPercent: 48,
    specs: ['Triple IMU Redundancy', 'Live Wind Feedback Loop', 'Ballistic Parachute Trigger'],
    icon: 'Cpu'
  }
];
