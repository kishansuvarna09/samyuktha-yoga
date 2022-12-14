import BeginnersImage from '/assets/classes_beginners.jpg';
import VinyasaImage from '/assets/classes_vinyasa.jpg';
import PrivateImage from '/assets/classes_private.jpg';
import WeekendWorkshopImage from '/assets/classes_weekend.jpg';

const classes = [
  {
    type: 'level_0',
    title: 'BEGINNERS/INTERMEDIATE YOGA',
    subtitle: '12-Day Program',
    description:
      'Join me in a virtual setting for a 60 Minute Hatha style flow, helping to welcome Yoga into the body and the mind! This session integrates Yoga poses and breathwork and is perfect for anyone starting their Yoga journey!',
    timings: [
      'Monday, Wednesday, Friday - (8pm to 9pm)',
      'Tuesday, Thursday, Friday - (8am to 9am)',
    ],
    image: BeginnersImage,
  },
  {
    type: 'level_1',
    title: 'VINYASA - (Intermediate/Advanced)',
    subtitle: '8-Day Program',
    description:
      'Join me for an Energising Vinyasa style flow for 60 minutes, helping to bring strength to the body and a release for the mind.',
    timings: ['Saturday, Sunday - (8am to 9am)'],
    image: VinyasaImage,
  },
  {
    type: 'level_2',
    title: 'Pranayama/breathe work - All Levels',
    subtitle: '8-Day Program',
    description:
      'Relax and De-stress with me in a soothing Pranayama class suitable for all levels and for anyone wanting some time out for self care!',
    timings: ['Saturday, Sunday - (45 minutes)'],
    image: PrivateImage,
  },
  {
    type: 'level_3',
    title: 'Weekend Workshop - All Levels',
    subtitle: '2-Day Program',
    description:
      'Join me on the weekend workshop where you will be nourished and guided through gentle restorative Yoga postures, receive hands-on energy healing, and then gather in a circle for intention setting. Please bring a journal, pen and a hand towel.',
    image: WeekendWorkshopImage,
    timings: ['To be scheduled'],
  },
];

export default classes;
