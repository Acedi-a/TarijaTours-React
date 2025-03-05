import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaWineGlassAlt,
  FaUtensils,
  FaCamera,
  FaHiking,
  FaMountain,
  FaWater,
  FaMusic,
} from 'react-icons/fa';

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const Card = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  border-radius: 30px;
  overflow: hidden;
  cursor: pointer;
  background-color: #2D3047;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  perspective: 1000px;
  
  &:hover {
    transform: translateY(-15px) rotateY(-5deg);
    box-shadow: 25px 25px 50px rgba(0, 0, 0, 0.5);
  }
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8));
    z-index: 1;
  }
`;

const TourImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const Content = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2rem;
  z-index: 2;
  transform: translateZ(20px);
`;

const Tag = styled.div`
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background: linear-gradient(45deg, #E94057, #F27121);
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 50px;
  margin-bottom: 1rem;
  transform: translateY(20px);
  opacity: 0;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
              opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  ${Card}:hover & {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Title = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  transform: translateY(20px);
  opacity: 0;
  transition: transform 0.4s 0.1s cubic-bezier(0.4, 0, 0.2, 1), 
              opacity 0.4s 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  
  ${Card}:hover & {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Description = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1), 
              opacity 0.4s 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  ${Card}:hover & {
    max-height: 100px;
    opacity: 1;
  }
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1.5rem;
  transform: translateY(20px);
  opacity: 0;
  transition: transform 0.4s 0.2s cubic-bezier(0.4, 0, 0.2, 1), 
              opacity 0.4s 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  span {
    font-size: 1rem;
    font-weight: 400;
    opacity: 0.7;
  }
  
  ${Card}:hover & {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Features = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 2;
`;

const Feature = styled.div`
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1rem;
  transform: translateX(50px);
  opacity: 0;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
              opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  ${Card}:hover &:nth-child(1) {
    transform: translateX(0);
    opacity: 1;
    transition-delay: 0.1s;
  }
  
  ${Card}:hover &:nth-child(2) {
    transform: translateX(0);
    opacity: 1;
    transition-delay: 0.2s;
  }
  
  ${Card}:hover &:nth-child(3) {
    transform: translateX(0);
    opacity: 1;
    transition-delay: 0.3s;
  }
`;

const HotLabel = styled.div`
  position: absolute;
  top: 2rem;
  left: 2rem;
  padding: 0.5rem 1.5rem;
  background: rgba(233, 64, 87, 0.9);
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 50px;
  z-index: 2;
  transform: translateY(-50px) rotate(-5deg);
  opacity: 0;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
              opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  ${props =>
    props.isHot &&
    `
    transform: translateY(0) rotate(-5deg);
    opacity: 1;
  `}
`;

const TourCard = ({ tour, index }) => {
    const getRandomFeatures = () => {
        const features = [
            <FaHiking key="hiking" />,
            <FaCamera key="camera" />,
            <FaMountain key="mountain" />,
            <FaWater key="water" />,
            <FaMusic key="music" />,
            <FaWineGlassAlt key="wine" />,
            <FaUtensils key="food" />
        ];
        return features.slice(0, 3);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
        >
            <Card>
                <TourImage
                    src={tour.portada || 'https://via.placeholder.com/400x300?text=Amazing+Tour'}
                    alt={tour.nombre}
                />
                <HotLabel isHot={tour.cupos_disponibles && tour.cupos_disponibles < 10}>
                    Only {tour.cupos_disponibles} spots left!
                </HotLabel>
                <Features>
                    {getRandomFeatures().map((feature, i) => (
                        <Feature key={i}>{feature}</Feature>
                    ))}
                </Features>
                <Content>
                    <Tag>{tour.destino}</Tag>
                    <Title>{tour.nombre}</Title>
                    <Description>
                        <div dangerouslySetInnerHTML={{ __html: tour.descripcion }} />
                    </Description>
                    <Price>
                        ${tour.precio || 'Contact us'}
                        <span> / person</span>
                    </Price>
                    <Link to={`/tours/${tour.id}`} style={{ textDecoration: 'none' }}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full bg-white text-red-700 px-6 py-2 rounded-full font-semibold hover:bg-red-700 hover:text-white transition-all duration-300"
                        >
                            Mas detalles
                        </motion.button>
                    </Link>
                </Content>
            </Card>
        </motion.div>
    );
}

export default TourCard;