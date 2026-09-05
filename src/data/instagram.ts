import { InstagramPost } from '../types';
import facialImg from '../assets/images/treatment_facial_1788620915318.jpg';
import lashBrowImg from '../assets/images/lash_brow_treatment_1788620929712.jpg';
import skinTextureImg from '../assets/images/skin_texture_result_1788620947199.jpg';
import studioImg from '../assets/images/hero_studio_bright_1788620881240.jpg';

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'post-1',
    imageUrl: skinTextureImg,
    caption: 'Fresh post-Hydrogloss glow! Zero foundation needed when skin barrier is deeply nourished ✨ No filter, just healthy texture by Dalal.',
    likes: 184,
    tag: '#NaturalSkinResults',
    url: 'https://www.instagram.com/dgtheaesthetician',
  },
  {
    id: 'post-2',
    imageUrl: lashBrowImg,
    caption: 'Lash Lift & Brow Threading combo for a effortless morning routine. Wake up feeling awake and lifted without mascara!',
    likes: 215,
    tag: '#LashLiftManchester',
    url: 'https://www.instagram.com/dgtheaesthetician',
  },
  {
    id: 'post-3',
    imageUrl: studioImg,
    caption: 'Quiet studio mornings in Hurlingham Studios. Ready for today’s calm consultations and bespoke facials 🌿',
    likes: 142,
    tag: '#LoulasStudio',
    url: 'https://www.instagram.com/dgtheaesthetician',
  },
  {
    id: 'post-4',
    imageUrl: facialImg,
    caption: 'Cinderella Facial in action. Gentle enzymes working their magic before a client’s weekend event ✨',
    likes: 267,
    tag: '#CinderellaFacial',
    url: 'https://www.instagram.com/dgtheaesthetician',
  },
];
