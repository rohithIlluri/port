import React, { memo } from 'react';
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiPython,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiGit,
  SiDocker,
  SiMongodb,
  SiPostgresql,
  SiNextdotjs,
  SiGraphql
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

// Memoized Skill Item Component
const SkillItem = memo(({ skill, index, getSkillIcon }) => (
  <div
    className="group/skill bg-white p-4 shadow-lg border border-gray-200 rounded-2xl hover:shadow-xl hover:scale-110 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center cursor-pointer"
    style={{ animationDelay: `${index * 50}ms` }}
  >
    <div className="mb-3 group-hover/skill:scale-125 group-hover/skill:rotate-12 transition-all duration-300">
      {getSkillIcon(skill)}
    </div>
    <span className="text-sm font-medium text-black/80 group-hover/skill:text-black group-hover/skill:font-bold transition-all duration-300">
      {skill}
    </span>
  </div>
));

const Skills = () => {
  const skills = [
    "JavaScript", "TypeScript", "React", "Node.js", "Python", "Java",
    "HTML/CSS", "Tailwind CSS", "Git", "Docker", "AWS", "MongoDB",
    "PostgreSQL", "Express.js", "Next.js", "GraphQL"
  ];

  const getSkillIcon = (skillName) => {
    switch (skillName) {
      case "JavaScript":
        return <SiJavascript className="w-6 h-6 text-yellow-400" />;
      case "TypeScript":
        return <SiTypescript className="w-6 h-6 text-blue-600" />;
      case "React":
        return <SiReact className="w-6 h-6 text-blue-400" />;
      case "Node.js":
        return <SiNodedotjs className="w-6 h-6 text-green-600" />;
      case "Python":
        return <SiPython className="w-6 h-6 text-blue-500" />;
      case "Java":
        return <FaJava className="w-6 h-6 text-red-600" />;
      case "HTML/CSS":
        return (
          <div className="flex space-x-1">
            <SiHtml5 className="w-3 h-6 text-orange-500" />
            <SiCss3 className="w-3 h-6 text-blue-500" />
          </div>
        );
      case "Tailwind CSS":
        return <SiTailwindcss className="w-6 h-6 text-cyan-500" />;
      case "Git":
        return <SiGit className="w-6 h-6 text-orange-600" />;
      case "Docker":
        return <SiDocker className="w-6 h-6 text-blue-500" />;
      case "AWS":
        return (
          <div className="w-6 h-6 bg-orange-400 text-white rounded-sm flex items-center justify-center text-xs font-bold">
            AWS
          </div>
        );
      case "MongoDB":
        return <SiMongodb className="w-6 h-6 text-green-500" />;
      case "PostgreSQL":
        return <SiPostgresql className="w-6 h-6 text-blue-600" />;
      case "Express.js":
        return (
          <div className="w-6 h-6 bg-gray-700 text-white rounded-sm flex items-center justify-center text-xs font-bold">
            E
          </div>
        );
      case "Next.js":
        return <SiNextdotjs className="w-6 h-6 text-black" />;
      case "GraphQL":
        return <SiGraphql className="w-6 h-6 text-pink-500" />;
      default:
        return (
          <div className="w-6 h-6 bg-gray-400 rounded-sm flex items-center justify-center text-white text-xs font-bold">
            {skillName.charAt(0)}
          </div>
        );
    }
  };

  return (
    <section id="skills" className="py-4 relative overflow-hidden liquid-wave group mt-2 sm:mt-3 lg:mt-4" aria-label="Skills section">
      <div className="bg-white p-6 lg:p-8 relative z-20 shadow-lg border border-gray-200 rounded-2xl hover:shadow-xl transition-all duration-500">
        <h2 className="text-2xl font-light mb-8 text-black/90 group-hover:text-black group-hover:scale-105 transition-all duration-300">Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {skills.map((skill, index) => (
            <SkillItem
              key={skill}
              skill={skill}
              index={index}
              getSkillIcon={getSkillIcon}
            />
          ))}
          </div>
        </div>
      </section>
  );
};

export default memo(Skills); 