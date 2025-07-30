import React, { memo } from 'react';

const Skills = () => {
  const skills = [
    { name: "JavaScript", description: "ES6+, Async, Modern JS", icon: "JS" },
    { name: "React", description: "Hooks, Context, Router", icon: "⚛️" },
    { name: "Tailwind CSS", description: "Utility-first, Responsive", icon: "TW" },
    { name: "Node.js", description: "Express, APIs, Backend Dev", icon: "🟢" },
    { name: "Python", description: "Data Science, ML", icon: "🐍" },
    { name: "Git", description: "Version Control, CI/CD", icon: "📚" }
  ];

  const getSkillIcon = (skillName) => {
    switch (skillName) {
      case "JavaScript":
        return (
          <svg className="w-5 h-5 text-black/80" fill="currentColor" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0V0zm22.034 18.004c0 .438-.304.744-.742.744H7.474c-.438 0-.744-.306-.744-.744V5.996c0-.438.306-.744.744-.744h13.818c.438 0 .742.306.742.744v12.008zM9.996 9.996V8.004h4.008v1.992H9.996zm0 2.004v1.992h4.008v-1.992H9.996zm0 2.004v1.992h4.008v-1.992H9.996zm0 2.004v1.992h4.008v-1.992H9.996z"/>
          </svg>
        );
      case "React":
        return (
          <svg className="w-5 h-5 text-black/80" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.99-3.44 2.23-.33 1.22-.44 2.41-.44 3.47 0 1.06.11 2.25.44 3.47.33 1.24 2.09 2.23 3.44 2.23 1.346 0 3.107-.99 3.44-2.23.33-1.22.44-2.41.44-3.47 0-1.06-.11-2.25-.44-3.47-.33-1.24-2.09-2.23-3.44-2.23zm-9.75 0c-1.346 0-3.107.99-3.44 2.23-.33 1.22-.44 2.41-.44 3.47 0 1.06.11 2.25.44 3.47.33 1.24 2.09 2.23 3.44 2.23 1.346 0 3.107-.99 3.44-2.23.33-1.22.44-2.41.44-3.47 0-1.06-.11-2.25-.44-3.47-.33-1.24-2.09-2.23-3.44-2.23z"/>
          </svg>
        );
      case "Tailwind CSS":
        return (
          <svg className="w-5 h-5 text-black/80" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
          </svg>
        );
      case "Node.js":
        return (
          <svg className="w-5 h-5 text-black/80" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.909,1.678 c0.311,0.23,0.641,0.35,0.971,0.35c0.332,0,0.651-0.129,0.892-0.361c0.227-0.221,0.354-0.525,0.354-0.847V8.787 c0-0.143-0.114-0.254-0.256-0.254h-1.115c-0.139,0-0.255,0.114-0.255,0.254v10.021c0,0.08-0.045,0.153-0.118,0.19 c-0.072,0.034-0.158,0.034-0.23,0L4.019,16.68V7.235l7.708-4.455l7.694,4.448v9.444l-7.694,4.457 c-0.082,0.047-0.189,0.047-0.271,0L11.998,24z M19.099,13.993c0,1.917-1.568,3.479-3.499,3.479c-1.93,0-3.497-1.562-3.497-3.479 c0-1.917,1.567-3.479,3.497-3.479C17.531,10.514,19.099,12.076,19.099,13.993z M15.6,10.514c-1.93,0-3.497,1.562-3.497,3.479 c0,1.917,1.567,3.479,3.497,3.479c1.93,0,3.499-1.562,3.499-3.479C19.099,12.076,17.53,10.514,15.6,10.514z"/>
          </svg>
        );
      case "Python":
        return (
          <svg className="w-5 h-5 text-black/80" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm0 2c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 2c3.314 0 6 2.686 6 6s-2.686 6-6 6-6-2.686-6-6 2.686-6 6-6z"/>
          </svg>
        );
      case "Git":
        return (
          <svg className="w-5 h-5 text-black/80" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="skills" className="py-8 relative overflow-hidden" aria-label="Skills section">
      <div className="absolute inset-0 bg-gradient-to-br from-black/[0.01] via-white to-black/[0.02] rounded-lg"></div>
      <div className="relative bg-white/70 backdrop-blur-sm border border-black/5 rounded-lg shadow-sm hover:shadow-md transition-all duration-500 p-6 lg:p-8">
        <div className="relative z-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-light mb-3 text-black/90">Core Competencies</h2>
            <div className="w-12 h-px bg-black/30 mx-auto"></div>
            <p className="text-sm text-black/70 mt-3 max-w-2xl mx-auto leading-relaxed">
              Technologies and tools I use to bring ideas to life
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="bg-white/95 backdrop-blur-sm p-5 border border-black/10 hover:border-black/25 transition-all duration-300 group hover:scale-[1.02] shadow-md hover:shadow-lg relative z-10 focus-within:ring-2 focus-within:ring-black/20 focus-within:ring-offset-2 rounded-md hover:-translate-y-1"
              >
                <div className="flex items-center mb-3">
                  <div className="w-9 h-9 bg-black/5 border border-black/15 rounded-md flex items-center justify-center mr-3 group-hover:bg-black/10 group-hover:border-black/25 transition-all duration-300 group-hover:scale-105">
                    {getSkillIcon(skill.name)}
                  </div>
                  <h3 className="font-bold text-base group-hover:text-black transition-colors duration-300 text-black/85">{skill.name}</h3>
                </div>
                <p className="text-black/70 text-xs leading-relaxed group-hover:text-black/80 transition-colors duration-300">{skill.description}</p>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/[0.02] rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Skills); 