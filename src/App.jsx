import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Star, Shield, Swords, Feather, Heart, ChevronDown, ChevronUp } from 'lucide-react';

const ParallaxBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);

    const layers = [];
    const layerCount = 5;
    
    const geometries = [
      new THREE.SphereGeometry(50, 32, 32),
     
    ];


        const colors = [
          0xFFD700,   
          0x9932CC, 
          0xFF4500,   
          0x00FF00, 
          0xFF69B4    
        ];

    for (let i = 0; i < layerCount; i++) {
      const material = new THREE.MeshBasicMaterial({ 
        color: colors[i], 
        transparent: true, 
        opacity: 0.7,
        wireframe: i % 2 === 0 
      });
      const mesh = new THREE.Mesh(geometries[i], material);
      

      mesh.position.z = -10 - (i * 8);
      mesh.position.x = (Math.random() - 0.5) * 30;
      mesh.position.y = (Math.random() - 0.5) * 30;
      
      scene.add(mesh);
      layers.push(mesh);
    }

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.2,
      color: 0xFFD700,
      transparent: true,
      opacity: 0.6
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);


      layers.forEach((layer, index) => {
        layer.rotation.x += 0.001 * (index + 1);
        layer.rotation.y += 0.002 * (index + 1);
        layer.position.x += Math.sin(Date.now() * 0.0005 * (index + 1)) * 0.02;
        layer.position.y += Math.cos(Date.now() * 0.0005 * (index + 1)) * 0.02;
      });


      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x += 0.0002;

      renderer.render(scene, camera);
    };

    animate();


    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvasRef.current && canvasRef.current.contains(renderer.domElement)) {
        canvasRef.current.removeChild(renderer.domElement);
      }

      layers.forEach(layer => {
        layer.geometry.dispose();
        layer.material.dispose();
      });
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return <div ref={canvasRef} className="fixed inset-0 z-0 opacity-40" />;
};


const ChariotsWheel = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <motion.div
      className="relative w-40 h-40 mx-auto my-8"
      animate={{
        rotate: isHovering ? 0 : 360,
        color: ["#32CD32", "#FFA07A", "#FF8C00", "#FFD700"],
      }}
      transition={{
        rotate: { repeat: Infinity, duration: 20, ease: "linear" },
        color: { repeat: Infinity, duration: 10, ease: "linear" },
      }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
    >
      <i className="fas fa-dharmachakra text-[10rem]"></i>
    </motion.div>
  );
};



const KarnaEpicSite = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const { scrollYProgress } = useScroll();
  const currentDate = new Date().toLocaleString('en-IN', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
 
    minute: '2-digit', 
    timeZone: 'Asia/Kolkata' 
  });


  const sections = [
    {
      title: "The Birth of a Legend",
      content: "Karna was born to princess Kunti through a divine boon from Surya, the Sun God. As an unmarried teenager, Kunti was granted a boon to bear a child with divine qualities. Without much knowledge, she invoked the sun god, resulting in Karna's birth. Fearing societal backlash over her premarital pregnancy, Kunti abandoned the newborn Karna in a basket on the Ganges River.",
      secondaryContent: "The basket floated down the Charmanwati River, then to the Yamuna, and finally reached the Ganges in the kingdom of Anga (ancient Bengal). There, a charioteer's wife named Radha found the baby and, along with her husband Adhiratha Nandana, adopted him. They named him Vasushena and raised him as their own son, though they did inform him of his adoption as he grew up.",
      icon: Feather,
      color: "amber",
      image: "https://roadtodivinity.wordpress.com/wp-content/uploads/2017/06/the-legend-of-karna-book.jpg"
    },
    {
      title: "Forged in Adversity",
      content: "Karna grew up to be an accomplished warrior of extraordinary abilities and a gifted speaker. Despite his talents, he faced discrimination due to his perceived low caste as the son of a charioteer. This knowledge of his adoption affected Karna deeply, creating a sense of shame that would shape his identity throughout his life.",
      secondaryContent: "Karna's natural talents and divine heritage gave him special gifts - he was born with divine earrings and a breastplate (body armor) that made his face shine and protected him. These divine gifts set him apart as someone special. However, later in his life, the generous Karna would give away these protective items in charity, making himself vulnerable.",
      icon: Shield,
      color: "blue",
      image: "https://sheokhanda.wordpress.com/wp-content/uploads/2012/04/karna.jpg"
    },
    {
      title: "The Battlefield of Dharma",
      content: "Karna became a loyal friend to Duryodhana, who appointed him the king of Anga. When the Kurukshetra war began, Karna joined Duryodhana's side against the Pandavas. His life was marked by several curses that would play crucial roles in his downfall.",
      secondaryContent: "Karna suffered from three significant curses: Parashurama's curse that he would forget weapon knowledge at a critical moment; a Brahmin's curse that his chariot wheel would get stuck during his most crucial battle; and Mother Earth's curse that she would refuse to assist him during combat. Additionally, Karna had already used his divine weapon, Vasavi Shakti, to kill Ghatotkacha, leaving him without his most powerful weapon against Arjuna.",
      icon: Swords,
      color: "green",
      image: "https://roadtodivinity.wordpress.com/wp-content/uploads/2025/02/mathura-krishna-temple.jpg"
    },
    {
      title: "The Final Moment: The Chariot Wheel",
      content: "During his final duel with Arjuna on the battlefield, Karna's chariot wheel sank into the mud - fulfilling the Brahmin's curse. Following the warrior code (dharma), Karna disarmed himself and stepped down from his chariot to free the wheel, leaving himself vulnerable.",
      secondaryContent: "Karna pleaded with Arjuna to honor dharma by allowing him time to free his chariot wheel. However, Krishna reminded Arjuna of Karna's past actions - his role in Draupadi's humiliation and Abhimanyu's unfair killing. At Krishna's urging, Arjuna released the Anjalikastra toward the unarmed Karna, killing him. Karna's death marked a turning point in the Kurukshetra war, as the Kaurava army lost morale upon losing their greatest warrior.",
      icon: Star,
      color: "purple",
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgIc4-CdtiXZDbD9OFXhNo5oVMZLvpQHE1mHzbCxS_prB6BLYduTYC96oOH8ioKxkO_gRjhvI7cjhlcQ7vIGvo7IS_vyM7JGJBKl7gyrZdN32ft7VPJRnFk09SsXwmP1r3qyGDKnRdOcXjZ/s1600/KARNA-The+Story+of+a+Tragic+Hero-4.jpg"
    },
    {
      title: "Legacy of Karna",
      content: "Karna remains one of the most complex and popular characters in the Mahabharata. He embodied both nobility and bitterness, showing extraordinary generosity while also participating in dishonorable acts. His life story illustrates the conflict between personal loyalty and higher dharma.",
      secondaryContent: "As Sadhguru describes, Karna was 'a sweet mango gone bad' - a wonderful human being who became bitter. When Krishna revealed to Karna his true parentage - that Kunti was his mother and he was actually the brother of the Pandavas - Karna broke down. Despite this knowledge, his loyalty to Duryodhana remained unshaken, showcasing both his greatest virtue and his tragic flaw.",
      icon: Heart,
      color: "red",
      image: "https://sheokhanda.wordpress.com/wp-content/uploads/2012/04/karna1.jpg"
    }
  ];


  const chariotWheelVerse = `"At that time, O king, the earth swallowed up one of wheels of Karna's car. Quickly alighting then from his vehicle, he seized his sunken wheel with his two arms and endeavoured to lift it up with a great effort. Drawn up with force by Karna, the earth, which had swallowed up his wheel, rose up to a height of four fingers' breadth, with her seven islands and her hills and waters and forests.... O Partha, O Partha, wait for a moment, that is, till I lift this sunken wheel."`;


  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [1, 0.8, 0.6, 0.4, 0.2, 0]);
  
  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* 3D Parallax Background */}
      <ParallaxBackground /> 
    
      <motion.div 
        className="fixed inset-0 z-10 bg-gradient-to-br from-black/70 via-black/50 to-black/70"
        style={{ 
          y: backgroundY,
          scale: scale
        }}
      />

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 py-16 sm:px-6">
        {/* Title */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-600">The Fall of Karna</h1>
          <h2 className="text-2xl sm:text-3xl font-semibold text-amber-400 mb-2">The Chariot Wheel and His Tragic End</h2>
          <p className="mt-4 text-gray-400 text-sm sm:text-base">A pivotal moment in the Mahabharata showcasing fate, dharma, and tragedy</p>
          <p className="mt-2 text-xs text-gray-500">{currentDate}</p>
        </motion.div>

        {/* Animated Chariot Wheel */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
        >
          <ChariotsWheel />
        </motion.div>

        {/* Original Mahabharata Verse */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="my-8 p-6 bg-gradient-to-r from-amber-900/40 to-red-900/40 rounded-lg border border-amber-700/50 text-center"
        >
          <h3 className="text-xl font-semibold mb-4 text-amber-400">The Chariot Wheel Incident - Original Verse</h3>
          <p className="italic text-amber-200 text-sm sm:text-base leading-relaxed">
            {chariotWheelVerse}
          </p>
          <p className="mt-4 text-xs text-gray-400">- Mahabharata, Karna Parva</p>
        </motion.div>

        {/* Sections - Mobile Centric Accordion Style */}
        <div className="space-y-6 mt-12">
          {sections.map((section, index) => {
            const sectionRef = useRef(null);
            const Icon = section.icon;
            const isExpanded = expandedSection === index;
    

            useEffect(() => {
              if (isExpanded && sectionRef.current) {

                const timer = setTimeout(() => {
                  const elementTop = sectionRef.current.getBoundingClientRect().top;
                  const offset = window.innerHeight * 0.1; 
                  
                  window.scrollTo({
                    top: window.pageYOffset + elementTop - offset,
                    behavior: 'smooth'
                  });
                }, 300); 
    
                return () => clearTimeout(timer);
              }
            }, [isExpanded]);
    
            return (
              <motion.div
                ref={sectionRef}
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.5 }}
                className={`p-4 sm:p-6 rounded-xl bg-gradient-to-br from-${section.color}-900/30 to-${section.color}-800/20 border border-${section.color}-600/50 
                  hover:from-${section.color}-900/40 hover:to-${section.color}-800/30 transition-all`}
              >
                <button 
                  onClick={() => toggleSection(index)}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <Icon 
                      className={`mr-3 text-${section.color}-400`} 
                      size={28} 
                    />
                    <h2 className="text-xl sm:text-2xl font-semibold">{section.title}</h2>
                  </div>
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
    
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 space-y-4"
                    >
                      <div className="relative h-64 sm:h-80 overflow-hidden rounded-lg">
                        <img 
                          src={section.image} 
                          alt={section.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-xs">
                          Image: Scene from the Mahabharata depicting Karna's story
                        </div>
                      </div>
                      
                      <p className="text-base sm:text-lg opacity-90 leading-relaxed">
                        {section.content}
                      </p>
                      
                      <p className="text-sm sm:text-base opacity-70 leading-relaxed">
                        {section.secondaryContent}
                      </p>
    
                      {index === 3 && (
                        <div className="mt-6 p-4 bg-yellow-900/30 border border-yellow-700 rounded-lg">
                          <h3 className="text-xl font-semibold mb-2 text-yellow-400">The Chariot Wheel Incident</h3>
                          <p className="italic text-sm sm:text-base leading-relaxed">
                            {chariotWheelVerse}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Timeline */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="my-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-amber-400">Key Events Leading to Karna's Fall</h2>
          <div className="relative">
            <div className="absolute left-0 sm:left-1/2 top-0 h-full w-1 bg-amber-700/50 transform sm:-translate-x-1/2"></div>

            {[
              { "year": "Son of the Sun God: Birth and Abandonment", "event": "Karna is born to Kunti and Surya but is abandoned in a river." },
              { "year": "Blessed by the Sun, Raised by Mortals", "event": "Karna is found and raised by Adhiratha and Radha, growing up as a charioteer's son." },
              { "year": "Gifted Yet Cursed", "event": "Karna trains under Parashurama but is cursed for lying about his caste." },
              { "year": "A Warrior Without a Legacy", "event": "Karna is humiliated at the archery competition but is crowned king of Anga by Duryodhana." },
              { "year": "A Bond Stronger Than Blood", "event": "Karna becomes Duryodhana's closest ally and pledges loyalty to him." },
              { "year": "The Generous Son of Surya", "event": "Karna gives away his divine armor and earrings to Indra, making himself vulnerable." },
              { "year": "A Radiant Warrior in Battle", "event": "Karna fights bravely in the Kurukshetra War, killing many warriors, including Ghatotkacha." },
              { "year": "The Sun Sets on a King", "event": "Karna becomes the commander of the Kaurava army after Drona's death." },
              { "year": "Fate's Cruel Hand", "event": "Karna and Arjuna engage in a duel, but Karna's chariot wheel gets stuck in the mud." },
              { "year": "The Fallen Hero", "event": "Arjuna kills Karna using the Anjalikastra while he is defenseless." }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 * index + 1.2, duration: 0.5 }}
                className={`relative flex flex-col sm:flex-row items-start sm:items-center mb-12 pl-6 sm:pl-0 ${
                  index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                <div className={`w-full sm:w-5/12 ${index % 2 === 0 ? "sm:text-right sm:pr-8" : "sm:text-left sm:pl-8"}`}>
                  <h3 className="text-xl font-bold text-amber-500">{item.year}</h3>
                  <p className="text-sm sm:text-base">{item.event}</p>
                </div>

                <div className="absolute left-0 sm:left-1/2 top-0 w-4 h-4 bg-amber-500 rounded-full transform sm:-translate-x-1/2 mt-1.5 sm:mt-0"></div>

                <div className="hidden sm:block sm:w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-500">The Fall of Karna: The Chariot Wheel and His Tragic End</p>
          <p className="text-xs text-gray-600 mt-1">Last updated: {currentDate}</p>
        </div>
      </div>
    </div>
  );
};

export default KarnaEpicSite;
