import { GoogleIcon, DuckDuckGoIcon, BingIcon, BaiduIcon } from '@/components/icons'
import type { CategoryLink, SearchEngine, Shortcut } from './types'

export const SEARCH_ENGINES: SearchEngine[] = [
    { id: 'google', name: 'Google', url: 'https://www.google.com/search?q=', icon: GoogleIcon },
    { id: 'duckduckgo', name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=', icon: DuckDuckGoIcon },
    { id: 'bing', name: 'Bing', url: 'https://www.bing.com/search?q=', icon: BingIcon },
    { id: 'baidu', name: 'Baidu', url: 'https://www.baidu.com/s?wd=', icon: BaiduIcon },
]

export const DEFAULT_SEARCH_ENGINE = 'duckduckgo'

export const CATEGORY_LINKS = {
    development: [
        { id: '1', title: 'GitHub', url: 'https://github.com', icon: 'G', color: '#24292e' },
        { id: '2', title: 'GitLab', url: 'https://gitlab.com', icon: 'G', color: '#fc6d26' },
        { id: '3', title: 'Stack Overflow', url: 'https://stackoverflow.com', icon: 'S', color: '#f48024' },
        { id: '4', title: 'CodePen', url: 'https://codepen.io', icon: 'C', color: '#000000' },
        { id: '5', title: 'Vercel', url: 'https://vercel.com', icon: 'V', color: '#000000' },
        { id: '6', title: 'Docker', url: 'https://www.docker.com', icon: 'D', color: '#2496ed' },
        { id: '7', title: 'MDN', url: 'https://developer.mozilla.org', icon: 'M', color: '#000000' },
        { id: '8', title: 'npm', url: 'https://www.npmjs.com', icon: 'N', color: '#cb3837' },
        { id: '9', title: 'VS Code', url: 'https://code.visualstudio.com', icon: 'V', color: '#007acc' },
        { id: '10', title: 'Postman', url: 'https://www.postman.com', icon: 'P', color: '#ff6c37' },
    ],
    social: [
        { id: '1', title: 'Reddit', url: 'https://www.reddit.com', icon: 'R', color: '#ff4500' },
        { id: '2', title: 'Twitter', url: 'https://twitter.com', icon: 'T', color: '#1da1f2' },
        { id: '3', title: 'Discord', url: 'https://discord.com', icon: 'D', color: '#5865f2' },
        { id: '4', title: 'LinkedIn', url: 'https://www.linkedin.com', icon: 'L', color: '#0077b5' },
        { id: '5', title: 'Mastodon', url: 'https://mastodon.social', icon: 'M', color: '#6364ff' },
        { id: '6', title: 'Twitch', url: 'https://www.twitch.tv', icon: 'T', color: '#9146ff' },
        { id: '7', title: 'Telegram', url: 'https://web.telegram.org', icon: 'T', color: '#0088cc' },
        { id: '8', title: 'WhatsApp', url: 'https://web.whatsapp.com', icon: 'W', color: '#25d366' },
        { id: '9', title: 'Instagram', url: 'https://www.instagram.com', icon: 'I', color: '#e4405f' },
        { id: '10', title: 'Facebook', url: 'https://www.facebook.com', icon: 'F', color: '#1877f2' },
    ],
    media: [
        { id: '1', title: 'YouTube', url: 'https://www.youtube.com', icon: 'Y', color: '#ff0000' },
        { id: '2', title: 'Spotify', url: 'https://open.spotify.com', icon: 'S', color: '#1db954' },
        { id: '3', title: 'Netflix', url: 'https://www.netflix.com', icon: 'N', color: '#e50914' },
        { id: '4', title: 'SoundCloud', url: 'https://soundcloud.com', icon: 'S', color: '#ff5500' },
        { id: '5', title: 'Prime Video', url: 'https://www.primevideo.com', icon: 'A', color: '#00a8e1' },
        { id: '6', title: 'Plex', url: 'https://www.plex.tv', icon: 'P', color: '#e5a00d' },
        { id: '7', title: 'Apple Music', url: 'https://music.apple.com', icon: 'A', color: '#fa243c' },
        { id: '8', title: 'Bilibili', url: 'https://www.bilibili.com', icon: 'B', color: '#fb7299' },
        { id: '9', title: 'iQIYI', url: 'https://www.iqiyi.com', icon: 'I', color: '#00be06' },
        { id: '10', title: 'Youku', url: 'https://www.youku.com', icon: 'Y', color: '#00a862' },
    ],
    productivity: [
        { id: '1', title: 'Notion', url: 'https://www.notion.so', icon: 'N', color: '#000000' },
        { id: '2', title: 'Gmail', url: 'https://mail.google.com', icon: 'G', color: '#ea4335' },
        { id: '3', title: 'Calendar', url: 'https://calendar.google.com', icon: 'C', color: '#4285f4' },
        { id: '4', title: 'Drive', url: 'https://drive.google.com', icon: 'D', color: '#4285f4' },
        { id: '5', title: 'Trello', url: 'https://trello.com', icon: 'T', color: '#0079bf' },
        { id: '6', title: 'Figma', url: 'https://www.figma.com', icon: 'F', color: '#f24e1e' },
        { id: '7', title: 'Slack', url: 'https://slack.com', icon: 'S', color: '#4a154b' },
        { id: '8', title: 'Zoom', url: 'https://zoom.us', icon: 'Z', color: '#2d8cff' },
        { id: '9', title: 'Dropbox', url: 'https://www.dropbox.com', icon: 'D', color: '#0061ff' },
        { id: '10', title: 'OneDrive', url: 'https://onedrive.live.com', icon: 'O', color: '#0078d4' },
    ],
} as const satisfies Record<string, CategoryLink[]>

export const SHORTCUTS: Shortcut[] = [
    { key: '/', label: '搜索' },
    { key: '1-4', label: '引擎' },
    { key: 'Esc', label: '清除' },
]
