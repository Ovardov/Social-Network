// Libraries
import React, { FC } from 'react';
// Components
import AboutInfoCard from '../AboutInfoCard';
import AboutInterests from '../AboutInterests';
// Models
import User_ from '../../../models/User';
// Styles
import styles from './index.module.scss';

interface Props {
  userData: User_;
}

const ProfileAbout: FC<Props> = ({ userData, }) => {
  const { work, education, home, about, interests, } = userData;

  const aboutData = [
    {
      id: 1,
      categoryAddText: 'Add a workplace',
      categoryName: 'Work',
      categoryDetails: 'Work at',
      categoryFieldName: 'work',
      categoryData: work,
    },
    {
      id: 2,
      categoryAddText: 'Add an education',
      categoryName: 'Education',
      categoryDetails: 'Studied',
      categoryFieldName: 'education',
      categoryData: education,
    },
    {
      id: 3,
      categoryAddText: 'Add a place that you live',
      categoryName: 'Home',
      categoryDetails: `Lives in`,
      categoryFieldName: 'home',
      categoryData: home,
    },
    {
      id: 4,
      categoryAddText: 'Write some details about you',
      categoryName: 'About You',
      categoryDetails: '',
      categoryFieldName: 'about',
      categoryData: about,
    }
  ];

  return (
    <section className={styles.container}>
      <div className={styles['about-list']}>
        {aboutData?.map(data => <AboutInfoCard key={data.id} data={data} />)}
      </div>


      <AboutInterests interests={interests} />
    </section>
  );
};

export default ProfileAbout;
