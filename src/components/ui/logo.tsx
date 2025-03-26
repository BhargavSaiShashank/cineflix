"use client";

import React from 'react';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';

interface LogoProps {
  variant?: 'default' | 'small' | 'large';
  showTagline?: boolean;
  className?: string;
  linkClassName?: string;
  href?: string;
  onClick?: () => void;
  animated?: boolean;
}

const Logo = ({
  variant = 'default',
  showTagline = true,
  className,
  linkClassName,
  href = '/',
  onClick,
  animated = true
}: LogoProps) => {
  // Size configurations based on variant
  const sizes = {
    small: {
      container: 'w-7 h-7',
      textSize: 'text-lg',
      taglineSize: 'text-[7px]',
      taglineMargin: '-mt-0.5',
      mr: 'mr-2'
    },
    default: {
      container: 'w-9 h-9',
      textSize: 'text-2xl',
      taglineSize: 'text-[8px]',
      taglineMargin: '-mt-1',
      mr: 'mr-2.5'
    },
    large: {
      container: 'w-14 h-14',
      textSize: 'text-4xl',
      taglineSize: 'text-[10px]',
      taglineMargin: '-mt-1',
      mr: 'mr-3.5'
    }
  };

  const currentSize = sizes[variant];
  
  // Enhanced animation variants
  const containerAnimation = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };
  
  const brainAnimation = {
    initial: { rotate: 0 },
    animate: { rotate: 360, transition: { duration: 30, ease: "linear", repeat: Infinity } },
    hover: { 
      scale: 1.1,
      transition: { duration: 0.3 } 
    }
  };

  const nodeAnimation = {
    initial: { scale: 1, opacity: 0.8 },
    animate: { 
      scale: [1, 1.2, 1],
      opacity: [0.8, 1, 0.8],
      transition: { 
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };
  
  const connectionAnimation = {
    initial: { opacity: 0.2, pathLength: 0 },
    animate: { 
      opacity: [0.2, 0.8, 0.2],
      pathLength: [0, 1, 0],
      transition: { 
        duration: 2,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "linear"
      }
    }
  };
  
  const textAnimation = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } },
    hover: { 
      textShadow: [
        "0 0 8px rgba(99,102,241,0.8)",
        "0 0 15px rgba(236,73,153,0.8)",
        "0 0 20px rgba(16,185,129,0.8)"
      ],
      scale: 1.02,
      transition: { 
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };
  
  const shineAnimation = {
    initial: { opacity: 0, rotate: 0 },
    animate: { 
      opacity: [0, 0.5, 0],
      rotate: 360,
      transition: { 
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };
  
  const logoContent = (
    <motion.div 
      className={cn("relative flex items-center", className)}
      initial={animated ? "initial" : false}
      animate={animated ? "animate" : false}
      whileHover="hover"
      variants={containerAnimation}
    >
      {/* AI Brain Icon */}
      <div className="relative">
        <motion.div 
          className={cn(
            "relative rounded-full flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300 overflow-hidden",
            currentSize.container,
            currentSize.mr
          )}
          variants={brainAnimation}
        >
          {/* Outer ring with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent-tertiary to-secondary rounded-full opacity-90">
            {/* Cyberpunk circuit lines */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  style={{
                    top: '50%',
                    transform: `rotate(${i * 30}deg)`,
                    transformOrigin: 'center',
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Inner dark circle */}
          <div className="absolute inset-[2px] rounded-full bg-background/95 flex items-center justify-center backdrop-blur-sm">
            {/* Neural network nodes with enhanced glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(6)].map((_, i) => (
                <motion.div 
                  key={i} 
                  className="absolute w-[15%] h-[15%] rounded-full bg-gradient-to-br from-primary to-accent-tertiary shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                  style={{ 
                    transform: `rotate(${i * 60}deg) translateY(-150%) scale(0.8)`,
                  }}
                  variants={nodeAnimation}
                  custom={i}
                >
                  {/* Enhanced connection lines */}
                  <motion.div 
                    className="absolute inset-0 w-[200%] h-[1px] bg-gradient-to-r from-primary/20 via-primary/80 to-primary/20 origin-left shadow-[0_0_5px_rgba(99,102,241,0.5)]"
                    style={{ transform: 'translateX(50%) rotate(30deg)' }}
                    variants={connectionAnimation}
                  />
                </motion.div>
              ))}
            </div>
            
            {/* Center node with enhanced pulse */}
            <motion.div 
              className="absolute w-[30%] h-[30%] rounded-full bg-gradient-to-br from-primary via-accent-tertiary to-secondary shadow-[inset_0_0_10px_rgba(0,0,0,0.5),0_0_15px_rgba(99,102,241,0.5)]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
            
            {/* Enhanced energy waves */}
            <div className="absolute inset-0 opacity-20">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                style={{ transform: 'rotate(45deg) translateY(-50%) scale(2)' }}
              />
            </div>
          </div>
        </motion.div>
        
        {/* Enhanced glow effect */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/40 via-accent-tertiary/40 to-secondary/40 blur-xl z-[-1]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
      
      {/* Text Logo */}
      <motion.div 
        className="flex flex-col"
        variants={textAnimation}
      >
        <div className={cn(
          "font-bold bg-gradient-to-r from-primary via-accent-tertiary to-secondary bg-clip-text text-transparent transition-all duration-300",
          currentSize.textSize
        )}>
          <span className="font-black tracking-tight">Cine</span>
          <span className="font-black tracking-tight">F</span>
          <span className="font-black tracking-tight">lix</span>
        </div>
        {showTagline && (
          <div className={cn(
            "uppercase tracking-widest text-muted-foreground ml-0.5 font-medium",
            currentSize.taglineSize,
            currentSize.taglineMargin
          )}>
            AI Movie Discovery
          </div>
        )}
      </motion.div>
      
      {/* Enhanced shine effect */}
      <motion.div 
        className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-primary/20 to-secondary/0 blur-sm rounded-lg"
        variants={shineAnimation}
      />
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className={cn("flex items-center group", linkClassName)} onClick={onClick}>
        {logoContent}
      </Link>
    );
  }

  return logoContent;
};

export default Logo; 