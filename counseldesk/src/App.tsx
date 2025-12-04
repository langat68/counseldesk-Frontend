import Layout from './components/layout/Layout';
import Register from './components/auth/RegisterForm';
import Login from './components/auth/LoginForm';
import CalendarView from './components/calendar/CalendarView';

function App() {
  return (
    <Layout>
      <CalendarView />
    </Layout>
  );
}

export default App;
