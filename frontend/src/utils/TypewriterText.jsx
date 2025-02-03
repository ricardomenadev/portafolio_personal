import { motion } from 'framer-motion';


const TypewriterText = ({ text, delay = 0 }) => {
    const characters = text.split('');
    
    return (
      <motion.span
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ delay }}
      >
        {characters.map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.1,
              delay: delay + index * 0.02 // para velocidad de tipeo
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    );
  };

  

export default TypewriterText;