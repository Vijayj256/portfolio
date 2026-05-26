import React, { useEffect, useState } from 'react';
import Hero       from '../components/Hero/Hero';
import About      from '../components/About/About';
import Skills     from '../components/Skills/Skills';
import Projects   from '../components/Projects/Projects';
import Experience from '../components/Experience/Experience';
import Education  from '../components/Education/Education';
import Contact    from '../components/Contact/Contact';
import { getProfile, getProjects, getSkills, getExperience } from '../utils/api';

export default function Home() {
  const [data, setData] = useState({
    profile: null, projects: [], skills: [], experience: [],
  });

  useEffect(() => {
    // Update page title
    document.title = 'Vijay J | CS Student Portfolio';

    // Fetch data from API — falls back to defaults if server is offline
    Promise.allSettled([
      getProfile(), getProjects(), getSkills(), getExperience(),
    ]).then(([profile, projects, skills, experience]) => {
      setData({
        profile:    profile.status    === 'fulfilled' ? profile.value.data.data    : null,
        projects:   projects.status   === 'fulfilled' ? projects.value.data.data   : [],
        skills:     skills.status     === 'fulfilled' ? skills.value.data.data     : [],
        experience: experience.status === 'fulfilled' ? experience.value.data.data : [],
      });
    });
  }, []);

  return (
    <main>
      <Hero       profile={data.profile} />
      <About      profile={data.profile} />
      <Skills     skills={data.skills} />
      <Projects   projects={data.projects} />
      <Experience experience={data.experience} />
      <Education  />
      <Contact    profile={data.profile} />
    </main>
  );
}
