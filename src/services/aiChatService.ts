import { ChatMessage, ChatAction } from '../types/chat';
import { KNOWLEDGE_BASE } from '../data/chatbotKnowledge';

const BACKEND_CHAT_ENDPOINT = '/api/chat';

// Client-side rate limit & burst protection
const MAX_REQUESTS_PER_MINUTE = 5;
const MAX_REQUESTS_PER_HOUR = 25;
const RATE_LIMIT_STORAGE_KEY = 'drone_ai_call_timestamps';

/**
 * Check if the client exceeded local rate limit thresholds before dispatching requests.
 */
const checkAndRecordRateLimit = (): { allowed: boolean; reason?: string } => {
  if (typeof window === 'undefined') return { allowed: true };

  try {
    const now = Date.now();
    const stored = localStorage.getItem(RATE_LIMIT_STORAGE_KEY);
    let timestamps: number[] = stored ? JSON.parse(stored) : [];

    // Keep only timestamps within the last hour
    timestamps = timestamps.filter((t) => now - t < 60 * 60 * 1000);

    // Check burst limit (last 60s)
    const pastMinute = timestamps.filter((t) => now - t < 60 * 1000).length;
    if (pastMinute >= MAX_REQUESTS_PER_MINUTE) {
      return { allowed: false, reason: 'Per-minute rate limit reached' };
    }

    // Check hourly limit
    if (timestamps.length >= MAX_REQUESTS_PER_HOUR) {
      return { allowed: false, reason: 'Hourly limit reached' };
    }

    timestamps.push(now);
    localStorage.setItem(RATE_LIMIT_STORAGE_KEY, JSON.stringify(timestamps));
    return { allowed: true };
  } catch {
    return { allowed: true };
  }
};

/**
 * Fast client-side domain relevance checker to filter off-topic queries
 */
const isQueryRelevantToProject = (query: string): boolean => {
  const q = query.toLowerCase().trim();

  // Greetings & exploratory
  if (/^(hi|hello|hey|greetings|hola|namaste|sup|howdy|help|info|about|what can you do|who are you)(\s+.*)?$/i.test(q)) {
    return true;
  }

  // Keywords relevant to DroneCleaning.Tech
  const relevantKeywords = [
    'drone', 'drones', 'cleaning', 'clean', 'facade', 'skyscraper', 'building', 'high-rise', 'window', 'windows',
    'radar', 'fmcw', '77ghz', 'sensor', 'sensors', 'lidar', 'camera', 'cameras', 'laser', 'glass', 'mullion', 'standoff',
    'water', 'deionized', 'di', 'pure', 'mineral', 'tds', 'ppm', 'soap', 'detergent', 'squeegee', 'soft wash', 'softwash', 'psi', 'pressure',
    'tether', 'cable', 'umbilical', 'hose', 'winch', 'voltage', '800v', 'power', 'battery', 'batteries', 'flight time', 'kevlar',
    'wind', 'downdraft', 'gust', 'gusts', 'turbulence', 'aerodynamics', 'pid', 'controller', 'flight controller', 'imu', 'thrust',
    'roi', 'cost', 'costs', 'economics', 'business', 'gondola', 'gondolas', 'scaffold', 'scaffolding', 'swing stage', 'insurance', 'coverage',
    'safety', 'regulations', 'faa', 'part 107', 'airspace', 'parachute', 'geofencing', 'compliance', 'fall risk',
    'solar', 'panel', 'panels', 'desert', 'dust', 'soiling', 'photovoltaic', 'pv', 'efficiency', 'swarm',
    'yash', 'mukade', 'author', 'creator', 'founder', 'contact', 'email', 'portfolio', 'linkedin', 'github', 'instagram',
    'blog', 'article', 'articles', 'research', 'paper', 'papers', 'case study', 'project', 'tech', 'concept', 'proposal'
  ];

  const hasKeyword = relevantKeywords.some((kw) => q.includes(kw));
  if (hasKeyword) return true;

  // Patterns for off-topic requests
  const blatantOffTopicPatterns = [
    /write\s+(me\s+)?(a\s+)?(python|javascript|java|c\+\+|html|css|php|rust|sql|code|script|program)/i,
    /recipe\s+for/i,
    /solve\s+(this\s+)?(math|equation|integral|derivative)/i,
    /who\s+won\s+the/i,
    /write\s+(a\s+)?(poem|story|song|essay|fiction|joke)\s+about/i,
    /translate\s+.*to/i,
    /weather\s+in/i,
    /capital\s+of/i
  ];

  const isBlatantOffTopic = blatantOffTopicPatterns.some((pattern) => pattern.test(q));
  return !isBlatantOffTopic;
};

/**
 * Refusal message for off-topic inquiries
 */
const getOffTopicRefusal = (): {
  content: string;
  actions?: ChatAction[];
  suggestedQuestions?: string[];
} => {
  return {
    content: `I am specifically dedicated to answering questions about **DroneCleaning.Tech**, high-rise facade robotics, pure water chemistry, tether avionics, and creator **Yash Mukade**.

I cannot assist with unrelated general queries. Please feel free to ask about our radar positioning, 0 PPM water chemistry, or economic savings!`,
    suggestedQuestions: [
      'How does radar detect glass when lasers fail?',
      'Why use deionized water instead of soap?',
      'How does the tether deliver power and water?',
      'What are the ROI savings over scaffolding?'
    ],
    actions: [
      { label: 'Browse Technical Papers', type: 'scroll', target: 'articles' }
    ]
  };
};

/**
 * Intelligent client-side Semantic Search & Knowledge Engine
 */
export const queryNativeKnowledge = (userQuery: string): {
  content: string;
  actions?: ChatAction[];
  suggestedQuestions?: string[];
} => {
  const queryLower = userQuery.toLowerCase().trim();

  // Pre-check relevance
  if (!isQueryRelevantToProject(queryLower)) {
    return getOffTopicRefusal();
  }

  // 1. Greetings & Small Talk
  if (/^(hi|hello|hey|greetings|hola|namaste|sup|howdy)(\s+.*)?$/i.test(queryLower)) {
    return {
      content: `Hello! 👋 I'm **AeroBot**, your technical AI guide for **DroneCleaning.Tech**. 

I can answer any questions regarding:
- 📡 **77GHz FMCW Radar** for transparent glass tracking
- 💧 **0 PPM Deionized Water** chemistry & spot-free soft washing
- ⚡ **Composite High-Voltage Tether** & ground winch engineering
- 💨 **Skyscraper Aerodynamics & Flight Control** in severe downdrafts
- 💰 **Business ROI & Safety** vs traditional gondolas
- ☀️ **Autonomous Solar Farm Cleaning** in desert climates
- 👨‍💻 **Yash Mukade** (Project Creator & Visionary)

What would you like to explore today?`,
      suggestedQuestions: [
        'How does radar detect glass?',
        'Why use deionized water without soap?',
        'How does the tether work?',
        'What is the ROI compared to scaffolding?'
      ],
      actions: [
        { label: 'Explore Research Papers', type: 'scroll', target: 'articles' }
      ]
    };
  }

  // 2. Score and rank items in the knowledge base
  const scoredItems = KNOWLEDGE_BASE.map((item) => {
    let score = 0;

    if (queryLower.includes(item.title.toLowerCase())) {
      score += 20;
    }

    item.keywords.forEach((keyword) => {
      const kw = keyword.toLowerCase();
      if (queryLower.includes(kw)) {
        score += 8;
        if (kw.length > 5) score += 3;
      }
    });

    item.topics.forEach((topic) => {
      if (queryLower.includes(topic.toLowerCase())) {
        score += 5;
      }
    });

    const words = queryLower.split(/\s+/).filter((w) => w.length > 2);
    words.forEach((word) => {
      if (item.summary.toLowerCase().includes(word)) score += 2;
      if (item.detailedAnswer.toLowerCase().includes(word)) score += 1;
    });

    return { item, score };
  });

  scoredItems.sort((a, b) => b.score - a.score);
  const bestMatch = scoredItems[0];

  if (bestMatch && bestMatch.score >= 6) {
    const primary = bestMatch.item;
    return {
      content: primary.detailedAnswer,
      actions: primary.actions,
      suggestedQuestions: primary.suggestedNextQuestions || [
        'How does the tether system work?',
        'What are the ROI advantages over gondolas?',
        'Who is Yash Mukade?'
      ]
    };
  }

  // 3. Fallback General / Exploratory Synthesis
  return {
    content: `Here is how **DroneCleaning.Tech** addresses high-rise facade automation:

- 🚁 **Autonomous Tethered Multirotors**: Powered continuously via ground tether, replacing slow and hazardous manual gondolas.
- 📡 **FMCW Radar Sensors**: Reliably detects curtain-wall glass boundaries where visual cameras and LiDAR lasers fail.
- 💧 **Pure Deionized (DI) Water**: Natural solvent action washes away soot and dust with 0 PPM mineral residue, drying streak-free without soap.
- ⚡ **Continuous Operations**: 15-minute setup from street level, cutting facility maintenance overhead and eliminating worker fall hazards.

You can also send a direct inquiry to **Yash Mukade** for specialized discussions!`,
    suggestedQuestions: [
      'How does radar detect transparent glass?',
      'Why does pure water clean without detergent?',
      'What are the economic savings vs scaffolding?',
      'How do I contact Yash Mukade?'
    ],
    actions: [
      { label: 'Browse Technical Journal', type: 'scroll', target: 'articles' },
      { label: 'Message Yash Mukade', type: 'scroll', target: 'author' }
    ]
  };
};

/**
 * Main AI Query Dispatcher - Calls secure server backend proxy without exposing API key
 */
export const sendChatMessage = async (
  userMessage: string,
  history: ChatMessage[] = []
): Promise<{
  content: string;
  actions?: ChatAction[];
  suggestedQuestions?: string[];
  usedEngine: 'gemini' | 'native';
}> => {
  const queryTrimmed = userMessage.trim();

  // Guardrail check
  if (!isQueryRelevantToProject(queryTrimmed)) {
    const refusal = getOffTopicRefusal();
    return {
      ...refusal,
      usedEngine: 'native'
    };
  }

  // Check rate limit before calling serverless endpoint
  const rateLimit = checkAndRecordRateLimit();
  if (rateLimit.allowed) {
    try {
      const response = await fetch(BACKEND_CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: queryTrimmed,
          history: history.slice(-4).map((msg) => ({
            role: msg.role,
            content: msg.content
          }))
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.reply && data.reply.trim()) {
          const actions: ChatAction[] = [];
          const queryLower = queryTrimmed.toLowerCase();
          if (queryLower.includes('contact') || queryLower.includes('yash') || queryLower.includes('email')) {
            actions.push({ label: 'Message Yash Mukade', type: 'scroll', target: 'author' });
          } else {
            actions.push({ label: 'View Technical Journal', type: 'scroll', target: 'articles' });
          }

          return {
            content: data.reply.trim(),
            actions,
            suggestedQuestions: [
              'How does radar detect glass?',
              'Why is deionized water used?',
              'What are the ROI benefits vs gondolas?'
            ],
            usedEngine: 'gemini'
          };
        }
      }
    } catch {
      // Backend unavailable or offline -> seamlessly fallback to native engine
    }
  }

  // Default to built-in high-accuracy knowledge engine
  const nativeResult = queryNativeKnowledge(queryTrimmed);
  return {
    ...nativeResult,
    usedEngine: 'native'
  };
};
