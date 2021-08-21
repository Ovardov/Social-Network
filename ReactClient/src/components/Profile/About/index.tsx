// Libraries
import React from 'react';
// Components
import AboutInfoCard from '../AboutInfoCard';
// Styles
import styles from './index.module.scss';

const ProfileAbout = () => {
  const aboutData = [
    { id: 1, categoryName: 'Workplace', categoryTitle: 'Work', data: 'Work at VSG Bulgaria', },
    { id: 2, categoryName: 'Workplace', categoryTitle: 'Work', data: '', },
    { id: 3, categoryName: 'Workplace', categoryTitle: 'Work', data: 'Work at VSG Bulgaria', },
    { id: 4, categoryName: 'Workplace', categoryTitle: 'Work', data: 'Work at VSG Bulgaria', }
  ];

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ToDo Update user data
  };

  return (
    <section className={styles.container}>
      <div className={styles.list}>
        {aboutData?.map(data => <AboutInfoCard key={data.id} {...data} onSubmit={onSubmit} />)}
      </div>

      {/* ToDo Interests */}
    </section>
  );
};

export default ProfileAbout;
