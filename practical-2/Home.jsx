import About from './About'
import Header from './Header'
import Skills from './Skills'

function Home() {
  const skills = ['React', 'JavaScript', 'CSS', 'Vite']

  return (
    <>
      <Header
        name="Manas Moradiya"
        subtitle="Aspiring frontend developer building responsive web experiences."
        themeColor="#eef5ff"
      />
      <main className="content">
        <About
          bio="I am a 3rd-year CE student learning React and modern web development through practical projects."
          highlight=""
        />
        <Skills skillList={skills} />
      </main>
    </>
  )
}

export default Home
