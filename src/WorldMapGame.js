import React, { useState, useEffect } from 'react';

const locations = [
  { name: 'Нарьян-Мар', x: 65, y: 28, event: '🥶 Тут слишком холодно и нет солнца, нужно срочно куда-то свалить.', positiveEvent: '🏔️ Марина открыла первый в мире арктический spa-курорт и прославилась на весь мир!' },
  { name: 'Санкт-Петербург', x: 58, y: 34, event: '🌧️ Марина попала под дождь и простудилась. Нужно срочно уезжать в теплые края!', positiveEvent: '🎭 Марина стала известной актрисой в Мариинском театре и нашла свое призвание!' },
  { name: 'Москва', x: 62, y: 36, event: '🚗 Марина застряла в пробке на МКАД на 5 часов. Пора искать город поспокойнее.', positiveEvent: '🏙️ Марина основала успешный стартап и стала одной из самых влиятельных предпринимательниц столицы!' },
  { name: 'Армения', x: 62, y: 44, event: '🍖 Марина объелась шашлыками и лавашом. Нужно найти место, где есть и другая еда.', positiveEvent: '🍷 Марина стала экспертом по армянским винам и открыла сеть винных бутиков по всему миру!' },
  { name: 'Грузия', x: 65, y: 42, event: '👟 У Марины украли кроссовки и выгнали со съемной квартиры. Пора двигаться дальше!', positiveEvent: '🍇 Марина возродила древний сорт винограда и прославилась как лучший винодел Грузии!' },
  { name: 'Дубай', x: 66, y: 51, event: '🏜️ Марина чуть не растаяла от жары. Нужно найти место с более комфортным климатом.', positiveEvent: '🏗️ Марина спроектировала самый высокий небоскреб в мире и стала главным архитектором Дубая!' },
  { name: 'Гималаи', x: 72, y: 47, event: '🌊 Дождь шел 3 дня и дороги смыло наводнением. Марине пришлось идти через лес с дикими обезьянами в поисках интернета.', positiveEvent: '🧘 Марина достигла просветления, став самым молодым гуру в истории Гималаев!' },
  { name: 'Бали', x: 82, y: 64, event: '🕷️ Марину укусил паук. Нужно срочно искать место с хорошей медициной!', positiveEvent: '🏄‍♀️ Марина стала чемпионкой мира по серфингу и открыла школу серфинга на Бали!' },
  { name: 'Турция', x: 58, y: 46, event: '📺 Марине наскучили все турецкие сериалы. Пора искать новые впечатления.', positiveEvent: '🧿 Марина раскрыла секрет древнего амулета и стала хранительницей магического артефакта!' },
  { name: 'Сербия', x: 55, y: 44, event: '🍲 Марина не смогла привыкнуть к местной кухне. Нужно искать страну с более привычной едой.', positiveEvent: '🎾 Марина неожиданно выиграла теннисный турнир и стала национальной героиней Сербии!' },
  { name: 'Тайланд', x: 78, y: 57, event: '🕷️ Марину напугали огромные местные пауки. Пора искать место с менее экзотической фауной.', positiveEvent: '🐘 Марина основала заповедник для слонов и получила награду от короля Тайланда за вклад в экологию!' },
  { name: 'Аргентина', x: 30, y: 70, event: '💔 Марина рассталась с парнем и осталась одна в чужой стране. Нужно срочно менять обстановку!', positiveEvent: '👶 Марина родила ребенка и получила второе гражданство. Она останется тут жить!' },
  { name: 'Португалия', x: 46, y: 45, event: '🍷 Марина перепила портвейна и проспала экскурсию. Нужно найти менее "опасное" место для отдыха.', positiveEvent: '🎸 Марина научилась играть фаду и стала звездой лиссабонских таверн!' },
  { name: 'Испания', x: 49, y: 43, event: '🐂 Марина случайно оказалась на беге быков и еле унесла ноги. Пора искать более спокойное место.', positiveEvent: '💃 Марина выиграла чемпионат по фламенко и открыла самую популярную школу танцев в Севилье!' },
  { name: 'США', x: 20, y: 40, event: '🍔 Марина набрала 5 кг за неделю из-за фастфуда. Нужно срочно менять рацион и страну!', positiveEvent: '🎬 Марина снялась в голливудском блокбастере и получила Оскар за лучшую женскую роль!' },
  { name: 'Вьетнам', x: 81, y: 54, event: '🛵 Марину чуть не сбил мопед на тротуаре. Нужно найти страну с менее хаотичным движением.', positiveEvent: '☕ Марина создала уникальный сорт кофе и открыла сеть кофеен по всей Юго-Восточной Азии!' },
];

const WorldMapGame = () => {
  const [currentLocation, setCurrentLocation] = useState(locations[0]);
  const [visitedLocations, setVisitedLocations] = useState([locations[0].name]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [truncatedEvent, setTruncatedEvent] = useState('');
  const [marinaPosition, setMarinaPosition] = useState({ x: locations[0].x, y: locations[0].y });

  const findSafePosition = (location) => {
    const directions = [
      { dx: 2, dy: 0 }, { dx: -2, dy: 0 }, { dx: 0, dy: 2 }, { dx: 0, dy: -2 },
      { dx: 2, dy: 2 }, { dx: 2, dy: -2 }, { dx: -2, dy: 2 }, { dx: -2, dy: -2 }
    ];
    
    for (let { dx, dy } of directions) {
      const newX = location.x + dx;
      const newY = location.y + dy;
      if (!locations.some(loc => Math.abs(loc.x - newX) < 2 && Math.abs(loc.y - newY) < 2)) {
        return { x: newX, y: newY };
      }
    }
    
    return { x: location.x, y: location.y };
  };

  useEffect(() => {
    const maxLength = 150;
    const eventText = visitedLocations.length === 6 ? currentLocation.positiveEvent : currentLocation.event;
    setTruncatedEvent(eventText.length > maxLength ? eventText.substring(0, maxLength) + '...' : eventText);
    
    const safePosition = findSafePosition(currentLocation);
    setMarinaPosition(safePosition);
  }, [currentLocation, visitedLocations]);

  const handleLocationClick = (location) => {
    if (visitedLocations.length === 5) {
      setCurrentLocation(location);
      setVisitedLocations([...visitedLocations, location.name]);
      setIsGameOver(true);
    } else if (visitedLocations.length < 5) {
      setCurrentLocation(location);
      setVisitedLocations([...visitedLocations, location.name]);
    }
  };

  const resetGame = () => {
    setCurrentLocation(locations[0]);
    setVisitedLocations([locations[0].name]);
    setIsGameOver(false);
    setMarinaPosition(findSafePosition(locations[0]));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-white p-4 shadow-lg flex flex-col justify-start space-y-2">
  <div>
    <h2 className="text-xl md:text-2xl font-bold mb-1">{currentLocation.name}</h2>
    <p className="text-sm md:text-base">{truncatedEvent}</p>
  </div>
  {isGameOver ? (
    <p className="font-bold text-green-600 text-sm md:text-base">
      Игра окончена! Марина нашла свой дом.
    </p>
  ) : (
    <p className="font-bold text-red-600 text-sm md:text-base">
      Выбирай следующую локацию. Осталось посетить: {6 - visitedLocations.length}
    </p>
  )}
</div>
      
<div className="relative flex-grow overflow-hidden flex flex-col">
<div className="relative w-full">
        <img 
          src="https://i.postimg.cc/NfjF53CQ/translucent-image-1.png" 
          alt="Pixel World Map" 
          className="w-full object-cover"
        />

{locations.map((location) => (
          <button
            key={location.name}
            className={`absolute w-4 h-4 md:w-5 md:h-5 rounded-full ${
              visitedLocations.includes(location.name) || isGameOver
                ? 'bg-gray-500'
                : 'bg-red-500 hover:bg-red-600'
            }`}
            style={{ 
              left: `${location.x}%`, 
              top: `${location.y}%`, 
              transform: 'translate(-50%, -50%)' 
            }}
            onClick={() => handleLocationClick(location)}
            disabled={visitedLocations.includes(location.name) || isGameOver}
          />
        ))}
        
        <svg
          className="absolute transition-all duration-500 ease-in-out"
          style={{ 
            left: `${marinaPosition.x}%`, 
            top: `${marinaPosition.y}%`, 
            transform: 'translate(-50%, -50%)' 
          }}
          width="20"
          height="30"
          viewBox="0 0 10 15"
        >
          <rect x="2" y="0" width="6" height="6" fill="#FF9999" />
          <path d="M2 0 Q5 -2 8 0 L8 3 L2 3 Z" fill="#1a1a1a" />
          <rect x="3" y="2" width="1" height="1" fill="#000000" />
          <rect x="6" y="2" width="1" height="1" fill="#000000" />
          <rect x="3" y="6" width="4" height="6" fill="#FF0000" />
          <rect x="2" y="12" width="2" height="3" fill="#FF9999" />
          <rect x="6" y="12" width="2" height="3" fill="#FF9999" />
        </svg>
        
        
        
        
        {isGameOver && (
          <div className="absolute bottom-4 right-4">
            <button
              className="bg-green-500 text-white px-2 py-1 md:px-4 md:py-2 rounded text-sm md:text-base hover:bg-green-600"
              onClick={resetGame}
            >
              Сыграть еще
            </button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default WorldMapGame;
