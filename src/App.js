import Tree from './Tree/Tree';
import data from './data.json';
import './style/style.scss'

function App() {
  return (
    <div>
      <Tree tree={data} />
    </div>
  );
}

export default App;
