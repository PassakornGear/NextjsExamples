import Componentweather from './Weather/page'
import Todo from './TodoList/page'

export default function Home() {
  return (
    <div className="grid grid-rows-[10px_1fr_10px] items-center justify-items-center min-h-screen pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className='grid grid-cols-3 gap-2'>
        <div className=''>
          <Todo />
        </div>
        <div className=''>
          <Componentweather />
        </div>
      </div>

    </div>
  );
}
