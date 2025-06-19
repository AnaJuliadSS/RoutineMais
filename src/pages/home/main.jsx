import React, { useState, useEffect, useRef } from 'react';
import './main.css';
import { FaShoppingCart, FaCog, FaFileAlt, FaPlus, FaStopwatch, FaExclamationTriangle, FaCheck } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import vibrationSound from './dica.mp3';
import profileImage from './image.png';

export function Main() {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [currentDayIndex, setCurrentDayIndex] = useState(getCurrentDayIndex());
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [buttonText, setButtonText] = useState('Iniciar');
  const audioRef = useRef(null);

  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
  const currentDate = new Date();
  const [displayDate, setDisplayDate] = useState(currentDate);
  const [selectedTask, setSelectedTask] = useState(null);
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: '',
    start: '',
    end: '',
    checklist: []
  });
  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: 1, name: 'Mãe', selected: false },
    { id: 2, name: 'Pai', selected: false }
  ]);
  const [newContact, setNewContact] = useState('');
  const [tasksByDay, setTasksByDay] = useState({
    Seg: [
      { id: 1, content: 'Arrumar a casa', start: '12:00', end: '14:00', type: 'home', completed: false },
      { id: 2, content: 'Passear com o cachorro', start: '17:00', end: '17:30', type: 'pet', completed: false },
      { id: 3, content: 'Aula Redes', start: '19:00', end: '20:40', type: 'study', completed: false }
    ],
    Ter: [
      { id: 4, content: 'Preparar material', start: '11:00', end: '12:00', type: 'work', completed: false },
      { id: 5, content: 'Aula de dança', start: '10:00', end: '11:00', type: 'exercise', completed: false },
      { id: 6, content: 'Estudar prova matemática', start: '16:00', end: '18:00', type: 'study', completed: false },
      { id: 7, content: 'Estudar concurso', start: '19:00', end: '20:40', type: 'study', completed: false },
      { id: 8, content: 'Arrumar pia', start: '21:00', end: '21:30', type: 'home', completed: false },
      { id: 9, content: 'Trocar o gás', start: '22:00', end: '22:15', type: 'home', completed: false }
    ],
    Qua: [],
    Qui: [
      { id: 10, content: 'Visitar tia Rosa', start: '12:00', end: '14:00', type: 'family', completed: false },
      { id: 11, content: 'Jogo de vôlei', start: '18:00', end: '19:00', type: 'exercise', completed: false }
    ],
    Sex: [],
    Sab: [],
    Dom: [],
  });

  const categories = [
    { value: 'home', label: 'Casa', icon: '🏠' },
    { value: 'study', label: 'Estudo', icon: '📚' },
    { value: 'work', label: 'Trabalho', icon: '💼' },
    { value: 'exercise', label: 'Exercício', icon: '🏋️' },
    { value: 'health', label: 'Saúde', icon: '🏥' }
  ];

  const handleAddTask = () => {
    if (!newTask.title || !newTask.description || !newTask.category || !newTask.start || !newTask.end) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    const task = {
      id: Date.now(),
      content: newTask.title,
      description: newTask.description,
      start: newTask.start,
      end: newTask.end,
      type: newTask.category,
      checklist: newTask.checklist
    };

    // Adiciona a tarefa ao dia atual
    const currentDay = days[currentDayIndex];
    const updatedTasks = {
      ...tasksByDay,
      [currentDay]: [...(tasksByDay[currentDay] || []), task]
        .sort((a, b) => a.start.localeCompare(b.start))
    };

    setTasksByDay(updatedTasks);
    setShowAddTaskModal(false);
    setNewTask({
      title: '',
      description: '',
      category: '',
      start: '',
      end: '',
      checklist: []
    });
  };

  const handleAddEmergencyContact = () => {
    if (!newContact) return;

    setEmergencyContacts([
      ...emergencyContacts,
      { id: Date.now(), name: newContact, selected: false }
    ]);
    setNewContact('');
  };

  const handleEmergencyCall = () => {
    const selectedContact = emergencyContacts.find(c => c.selected);
    if (selectedContact) {
      alert(`Chamando ${selectedContact.name} para ajuda!`);
    } else {
      alert('Por favor, selecione um contato!');
    }
  };

  // Atualiza tarefas atrasadas
  useEffect(() => {
    const updateOverdueTasks = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentDay = now.getDay();

      const allTasks = tasksByDay[days[currentDay]];
      const overdue = allTasks.filter(task => {
        if (task.completed) return false;

        const [endHour, endMinute] = task.end.split(':').map(Number);
        return (currentHour > endHour || (currentHour === endHour && currentMinute > endMinute));
      });

      setOverdueTasks(overdue);
    };

    updateOverdueTasks();
    const interval = setInterval(updateOverdueTasks, 60000); // Atualiza a cada minuto

    return () => clearInterval(interval);
  }, [tasksByDay]);

  // Efeito para o cronômetro
  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setStopwatchTime(prevTime => {
          // Tocar som a cada 30 segundos
          if ((prevTime + 1) % 30 === 0 && audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          }

          return prevTime + 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  function getCurrentDayIndex() {
    return new Date().getDay(); // 0 para Domingo, 1 para Segunda, etc.
  }

  const handleStartStopwatch = () => {
    if (buttonText === 'Iniciar') {
      setIsRunning(true);
      setButtonText('Pausar');
    } else if (buttonText === 'Pausar') {
      setIsRunning(false);
      setButtonText('Recomeçar');
    } else { // Recomeçar
      setIsRunning(true);
      setButtonText('Pausar');
    }
  };

  const handleResetStopwatch = () => {
    setIsRunning(false);
    setStopwatchTime(0);
    setButtonText('Iniciar');
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const nextDay = () => {
    setCurrentDayIndex(prev => {
      const nextIndex = (prev + 1) % days.length;
      updateDisplayDate(nextIndex);
      return nextIndex;
    });
  };

  const prevDay = () => {
    setCurrentDayIndex(prev => {
      const prevIndex = (prev - 1 + days.length) % days.length;
      updateDisplayDate(prevIndex);
      return prevIndex;
    });
  };

  const updateDisplayDate = (dayIndex) => {
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const diff = dayIndex - currentDayOfWeek;
    const newDate = new Date(today);
    newDate.setDate(today.getDate() + diff);
    setDisplayDate(newDate);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleCompleteTask = () => {
    if (!selectedTask) return;

    // Atualiza a tarefa como concluída
    setTasksByDay(prev => {
      const updated = { ...prev };
      for (const day in updated) {
        updated[day] = updated[day].map(t =>
          t.id === selectedTask.id ? { ...t, completed: true } : t
        );
      }
      return updated;
    });

    setCompletedTasks(prev => prev + 1);
    setSelectedTask(null);
  };

  return (
    <div className="app-container">

      {selectedTask && (
        <div className="modal-overlay">
          <div className="modal task-modal">
            <h2>{selectedTask.content}</h2>

            <div className="task-time">
              {selectedTask.start} - {selectedTask.end}
            </div>

            <div className="task-description">
              <h3>Descrição:</h3>
              <p>{selectedTask.description || 'Nenhuma descrição fornecida.'}</p>
            </div>

            <div className="modal-buttons">
              <button
                className="complete-button"
                onClick={handleCompleteTask}
              >
                <FaCheck /> Finalizar Tarefa
              </button>
              <button
                className="cancel-button"
                onClick={() => setSelectedTask(null)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modais */}
      {showAddTaskModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Adicionar Tarefa</h2>

            <div className="form-group">
              <label>Título*</label>
              <input
                type="text"
                placeholder="ex: Estudar para prova"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Descrição*</label>
              <textarea
                placeholder="ex: Estudar para prova de matemática"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Categoria*</label>
              <select
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
              >
                <option value="">Selecione</option>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div className="time-inputs">
              <div className="form-group">
                <label>Início*</label>
                <input
                  type="time"
                  value={newTask.start}
                  onChange={(e) => setNewTask({ ...newTask, start: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Fim*</label>
                <input
                  type="time"
                  value={newTask.end}
                  onChange={(e) => setNewTask({ ...newTask, end: e.target.value })}
                />
              </div>
            </div>

            <div className="modal-buttons">
              <button className="cancel-button" onClick={() => setShowAddTaskModal(false)}>
                Cancelar
              </button>
              <button className="confirm-button" onClick={handleAddTask}>
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}

      {showEmergencyModal && (
        <div className="modal-overlay">
          <div className="modal emergency-modal">
            <h2>Pedir ajuda</h2>

            <div className="emergency-contacts">
              {emergencyContacts.map(contact => (
                <div key={contact.id} className="contact-item">
                  <input
                    type="radio"
                    id={`contact-${contact.id}`}
                    checked={contact.selected}
                    onChange={() => {
                      setEmergencyContacts(emergencyContacts.map(c => ({
                        ...c,
                        selected: c.id === contact.id
                      })));
                    }}
                  />
                  <label htmlFor={`contact-${contact.id}`}>{contact.name}</label>
                </div>
              ))}

              <div className="add-contact">
                <input
                  type="text"
                  placeholder="Adicionar contato"
                  value={newContact}
                  onChange={(e) => setNewContact(e.target.value)}
                />
                <button onClick={handleAddEmergencyContact}>+</button>
              </div>
            </div>
            <div className="modal-buttons">
              <button className="cancel-button" onClick={() => setShowEmergencyModal(false)}>
                Cancelar
              </button>
              <button className="emergency-button" onClick={handleEmergencyCall}>
                Chamar Emergência
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Áudio para a vibração */}
      <audio ref={audioRef} src={vibrationSound} />

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-container">
          <h1 className="logo">Routine+</h1>
          <TooltipIcon icon={
            <div className="score-container">
              <div className="score-counter">{completedTasks}</div>
            </div>
          } text="Sua pontuação total pelas tarefas concluídas!" />
        </div>

        <div className="nav-buttons">
          <TooltipIcon icon={<FaShoppingCart />} text="Troque seus pontos aqui!" />
          <TooltipIcon icon={<FaCog />} text="Configurações da conta" />
          <TooltipIcon icon={<FaFileAlt />} text="Bloco de notas" />
        </div>

        <div className="profile-container">
          <TooltipIcon
            icon={<img src={profileImage} alt="Profile" className="profile-pic" />}
            text="Meu perfil"
          />
        </div>
      </nav>

      <div className="main-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="stopwatch">
            <h3>Cronômetro</h3>
            <div className="time-display">{formatTime(stopwatchTime)}</div>
            <div className="stopwatch-buttons">
              <button className="start-button" onClick={handleStartStopwatch}>
                {buttonText}
              </button>
              <button className="reset-button" onClick={handleResetStopwatch}>
                Zerar
              </button>
            </div>
          </div>

          <div className="mini-calendar">
            <h3>Calendário</h3>
            <div className="current-date">
              {displayDate.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' })}
            </div>
          </div>
        </aside>

        {/* Conteúdo principal */}
        <main className="content">
          {/* Carrossel de dias */}
          <div className="day-carousel">
            <button onClick={prevDay} className="carousel-button">
              <IoIosArrowBack />
            </button>
            <h2 className="current-day">{days[currentDayIndex]}</h2>
            <button onClick={nextDay} className="carousel-button">
              <IoIosArrowForward />
            </button>
          </div>

          {/* Lista de tarefas */}
          <div className="tasks-list">
            {tasksByDay[days[currentDayIndex]]
              ?.filter(task => !task.completed)
              ?.sort((a, b) => a.start.localeCompare(b.start))
              ?.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onClick={() => handleTaskClick(task)}
                />
              ))}
          </div>

          {/* Botão adicionar tarefa */}
          <div className="add-task-footer">
            <button
              className="add-task-button"
              onClick={() => setShowAddTaskModal(true)}
            >
              <FaPlus /> Adicionar Tarefa
            </button>
          </div>
        </main>
      </div>

      {/* Rodapé */}
      <footer className="page-footer">
        <div className="overdue-tasks">
          <h3>Tarefas Atrasadas</h3>
          {overdueTasks.length > 0 ? (
            <ul>
              {overdueTasks.map(task => (
                <li key={task.id}>
                  {task.content} ({task.start} - {task.end})
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhuma tarefa atrasada</p>
          )}
        </div>
        <button
          className="emergency-button"
          onClick={() => setShowEmergencyModal(true)}
        >
          <FaExclamationTriangle /> Emergência
        </button>
      </footer>
    </div>
  );
}

// Componente Tooltip
function Tooltip({ text }) {
  return (
    <div className="tooltip">
      <span className="tooltip-text">{text}</span>
    </div>
  );
}

// Componente TooltipIcon
function TooltipIcon({ icon, text }) {
  return (
    <div className="tooltip-container">
      <div className="icon-wrapper">
        {icon}
      </div>
      <div className="tooltip">
        <span className="tooltip-text">{text}</span>
      </div>
    </div>
  );
}

// Componente de card de tarefa
function TaskCard({ task, onClick }) {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'home': return '🏠';
      case 'pet': return '🐕';
      case 'study': return '📚';
      case 'work': return '💼';
      case 'exercise': return '🏋️';
      case 'family': return '👨‍👩‍👧';
      default: return '✅';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'home': return '#D1B2FF';  // Lavanda escurecida (contraste 5.2:1)
      case 'pet': return '#FFD699';  // Laranja ajustado (contraste 4.6:1)
      case 'study': return '#A8E6CF';  // Verde menta reforçado (contraste 5.8:1)
      case 'work': return '#FFB8B8';  // Rosa mais profundo (contraste 4.7:1)
      case 'exercise': return '#99DEDE';  // Turquesa escurecido (contraste 5.1:1)
      case 'family': return '#FFA8BA';  // Rosa bebê ajustado (contraste 4.9:1)
      default: return '#C7C7C7';  // Cinza escurecido (contraste 5.3:1)
    }
  };

  return (
    <div
      className="task-card"
      style={{ backgroundColor: getTypeColor(task.type), cursor: "pointer" }}
      onClick={onClick}
    >
      <div className="task-content">
        <h3>{task.content}</h3>
        <p>{task.start} até {task.end}</p>
      </div>
      <div className="task-icon">
        {getTypeIcon(task.type)}
      </div>
    </div>
  );

}