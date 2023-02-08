import { Header } from './common/components/header/Header';
import { Routers } from './routes/Routers';
import { useState } from 'react';
import SearchContext from './common/components/UI/search/Search';

function App() {
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <Routers />
      </SearchContext.Provider>
    </div>
  );
}

export default App;
