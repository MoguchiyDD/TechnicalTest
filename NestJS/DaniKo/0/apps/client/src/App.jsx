import React, { useCallback } from 'react';
import ReactFlow, {
  Controls,
  ControlButton,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import { PaperPlaneIcon } from '@radix-ui/react-icons';

import 'reactflow/dist/style.css';


const initialNodes = [
  {  // /консультация
    id: '1',
    data: { label: '/консультация' },
    position: { x: 25, y: 25 },
    style: { background: '#FFFF8D' }
  },
  {
    id: '2',
    data: { label: 'Здравствуйте, Ваша заявка на консультацию принята! Как Вам удобно переговорить устно (/созвонимся) или перепиской (/спишемся)?' },
    position: { x: 25, y: 100 },
    style: { background: '#80D8FF' }
  },
  {  // /созвонимся
    id: '3',
    data: { label: '/созвонимся' },
    position: { x: 25, y: 315 },
    style: { background: '#FFFF8D' }
  },
  {  // /спишемся
    id: '4',
    data: { label: '/спишемся' },
    position: { x: 200, y: 315 },
    style: { background: '#FFFF8D' }
  },
  {
    id: '5',
    data: { label: 'Мне связаться с Вами в будущем по <номер-телефона-пользователя> номеру телефона? (/да-изменить или /не-изменять)' },
    position: { x: 115, y: 405 },
    style: { background: '#80D8FF' }
  },
  {  // /да-изменить
    id: '6',
    data: { label: '/да-изменить' },
    position: { x: 225, y: 575 },
    style: { background: '#FFFF8D' },
    sourcePosition: 'right',
    targetPosition: 'left'
  },
  {  // /не-изменять
    id: '7',
    data: { label: '/не-изменять' },
    position: { x: 225, y: 645 },
    style: { background: '#FFFF8D' },
    sourcePosition: 'right',
    targetPosition: 'left'
  },
  {
    id: '8',
    data: { label: 'Тогда  по какому номеру телефона мне с Вами связаться?' },
    position: { x: 425, y: 540 },
    style: { background: '#80D8FF' },
    sourcePosition: 'right',
    targetPosition: 'left'
  },
  {  // <номер-телефона-пользователя>
    id: '9',
    data: { label: '<номер-телефона-пользователя>' },
    position: { x: 615, y: 549 },
    style: { background: '#FF9E80' },
    sourcePosition: 'right',
    targetPosition: 'left'
  },
  {
    id: '10',
    data: { label: 'Как мне к Вам обращаться?' },
    position: { x: 815, y: 636 },
    style: { background: '#80D8FF' },
    sourcePosition: 'right',
    targetPosition: 'left'
  },
  {  // <полное-имя-пользователя>
    id: '11',
    data: { label: '<полное-имя-пользователя>' },
    position: { x: 1010, y: 636 },
    style: { background: '#FF9E80' },
    sourcePosition: 'right',
    targetPosition: 'left'
  },
  {  // END : /созвонимся
    id: '12',
    data: { label: 'Приятно познакомиться, <полное-имя-пользователя>! Менеджер позвонит Вам в ближайшее время по <номер-телефона-пользователя> номеру телефона.' },
    position: { x: 1630, y: 615 },
    style: { background: '#B388FF' },
    targetPosition: 'left'
  },
  {
    id: '13',
    data: { label: 'Приятно познакомиться, <полное-имя-пользователя>! Итак, Вы желаете себе веб-сайт (/сайт), программное приложение (/по) или игру (/игра).' },
    position: { x: 1520, y: 25 },
    style: { background: '#80D8FF' },
    sourcePosition: 'left',
    targetPosition: 'bottom'
  },
  {  // /сайт
    id: '14',
    data: { label: '/сайт' },
    position: { x: 1275, y: 430 },
    style: { background: '#FFFF8D' },
    sourcePosition: 'left',
    targetPosition: 'right'
  },
  {
    id: '15',
    data: { label: 'На какую тему будет веб-сайт? Например, магазин для книг, игровой комплекс, космодром и так далее.' },
    position: { x: 1075, y: 295 },
    style: { background: '#80D8FF' },
    sourcePosition: 'top',
    targetPosition: 'bottom'
  },
  {  // /по
    id: '16',
    data: { label: '/по' },
    position: { x: 1275, y: 502 },
    style: { background: '#FFFF8D' },
    sourcePosition: 'left',
    targetPosition: 'right'
  },
  {
    id: '17',
    data: { label: '<полное-имя-пользователя> желает программное обеспечение на мобильном (/по-мобильное) или настольном (/по-настольное) устройстве?' },
    position: { x: 685, y: 220 },
    style: { background: '#80D8FF' },
    sourcePosition: 'top',
    targetPosition: 'right'
  },
  {  // /по-настольное
    id: '18',
    data: { label: '/по-настольное' },
    position: { x: 375, y: 120 },
    style: { background: '#FFFF8D' },
    sourcePosition: 'top',
    targetPosition: 'bottom'
  },
  {  // /по-мобильное
    id: '19',
    data: { label: '/по-мобильное' },
    position: { x: 550, y: 120 },
    style: { background: '#FFFF8D' },
    sourcePosition: 'top',
    targetPosition: 'bottom'
  },
  {
    id: '20',
    data: { label: 'На какую тему будет программное обеспечение? Например, облегчение подсчёта товаров, музыкальная ча-ча-ча, антивирус и так далее.' },
    position: { x: 875, y: 115 },
    style: { background: '#80D8FF' },
    sourcePosition: 'top',
    targetPosition: 'left'
  },
  {  // /игра
    id: '21',
    data: { label: '/игра' },
    position: { x: 1275, y: 575 },
    style: { background: '#FFFF8D' },
    sourcePosition: 'left',
    targetPosition: 'right'
  },
  {
    id: '22',
    data: { label: '<полное-имя-пользователя> /желает игру на мобильном (/игра-мобильная) или настольном (/игра-настольная) устройстве?' },
    position: { x: 425, y: 335 },
    style: { background: '#80D8FF' },
    sourcePosition: 'top',
    targetPosition: 'right'
  },
  {  // /игра-настольная
    id: '23',
    data: { label: '/игра-настольная' },
    position: { x: 325, y: 245 },
    style: { background: '#FFFF8D' },
    sourcePosition: 'top',
    targetPosition: 'bottom'
  },
  {  // /игра-мобильная
    id: '24',
    data: { label: '/игра-мобильная' },
    position: { x: 500, y: 245 },
    style: { background: '#FFFF8D' },
    sourcePosition: 'top',
    targetPosition: 'bottom'
  },
  {
    id: '25',
    data: { label: 'На какую тему будет игра? Например, полёт в космос, сражение за свои достоинства, ролевуха с эпичностью и так далее.' },
    position: { x: 205, y: 25 },
    style: { background: '#80D8FF' },
    sourcePosition: 'right',
    targetPosition: 'bottom'
  },
  {  // <описание>
    id: '26',
    data: { label: '<описание>' },
    position: { x: 1175, y: 50 },
    style: { background: '#FF9E80' },
    sourcePosition: 'right',
    targetPosition: 'top'
  },
  {  // END : /спишемся
    id: '27',
    data: { label: 'У Вас отпадный вкус, <полное-имя-описание>! В ближайшее время разбирающийся в области <приложение> позвонит Вам в ближайшее время по <номер-телефона-пользователя> номеру телефона для уточнения Вашего заказа.' },
    position: { x: 1275, y: 125 },
    style: { background: '#B388FF' },
    sourcePosition: 'bottom',
    targetPosition: 'top'
  }
];
const initialEdges = [
  { id: '1-2', source: '1', target: '2', type: 'step' },  // /консультация
  { id: '2-3', source: '2', target: '3', type: 'step' },  // /созвонимся
  { id: '2-4', source: '2', target: '4', type: 'step' },  // /спишемся
  { id: '3-5', source: '3', target: '5', type: 'step' },  // /да-изменить || /не-изменять
  { id: '4-5', source: '4', target: '5', type: 'step' },  // /да-изменить || /не-изменять
  { id: '5-6', source: '5', target: '6', type: 'step' },  // /да-изменить
  { id: '5-7', source: '5', target: '7', type: 'step' },  // /не-изменять
  { id: '6-8', source: '6', target: '8', type: 'step' },
  { id: '8-9', source: '8', target: '9', type: 'step' },  // <номер-телефона-пользователя>
  { id: '9-10', source: '9', target: '10', type: 'step' },
  { id: '7-10', source: '7', target: '10', type: 'step' },
  { id: '10-11', source: '10', target: '11', type: 'step' },  // <полное-имя-пользователя>
  { id: '11-12', source: '11', target: '12', label: '/созвонимся', type: 'step' },  // <полное-имя-пользователя>
  { id: '11-13', source: '11', target: '13', label: '/спишемся', type: 'step' },
  { id: '13-14', source: '13', target: '14', type: 'step' },  // /сайт
  { id: '14-15', source: '14', target: '15', type: 'step' },
  { id: '13-16', source: '13', target: '16', type: 'step' },  // /по
  { id: '16-17', source: '16', target: '17', type: 'step' },
  { id: '17-18', source: '17', target: '18', type: 'step' },  // /по-настольное
  { id: '17-19', source: '17', target: '19', type: 'step' },  // /по-мобильное
  { id: '18-20', source: '18', target: '20', type: 'step' },
  { id: '19-20', source: '19', target: '20', type: 'step' },
  { id: '13-21', source: '13', target: '21', type: 'step' },  // /игра
  { id: '21-22', source: '21', target: '22', type: 'step' },
  { id: '22-23', source: '22', target: '23', type: 'step' },  // /игра-настольная
  { id: '22-24', source: '22', target: '24', type: 'step' },  // /игра-мобильная
  { id: '23-25', source: '23', target: '25', type: 'step' },
  { id: '24-25', source: '24', target: '25', type: 'step' },
  { id: '15-26', source: '15', target: '26', type: 'step' },  // <описание>
  { id: '20-26', source: '20', target: '26', type: 'step' },  // <описание>
  { id: '25-26', source: '25', target: '26', type: 'step' },  // <описание>
  { id: '26-27', source: '26', target: '27', type: 'step' },  // END : /спишемся
];
 
export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
 
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111' }}>
      <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} >
        <Controls>
          <ControlButton onClick={() => {fetch('/api').then((res) => res.text()).then(whatsapp);}}>
            <PaperPlaneIcon />
          </ControlButton>
        </Controls>
        <Background variant="cross" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
