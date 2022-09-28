import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Create from './components/tasks/create/Create';
import Edit from './components/tasks/edit/Edit';
import Index from './components/tasks/view/Index';

function App() {
  return (
    <Routes>
      <Route path="/:taskId" element={<Edit />} />
      <Route path="/create" element={<Create />} />
      <Route path="/" element={<Index />} />
   </Routes>
  );
}

export default App;
