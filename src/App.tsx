import { Header } from './common/components/header/Header';
import { Routers } from './routes/Routers';
import { useState } from 'react';

function App() {
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <Routers />
    </div>
  );
}

export default App;
