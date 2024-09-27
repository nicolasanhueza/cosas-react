import { Link } from "../Link.jsx";

export default function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <div>
        <img src="" alt="Foto de nicolas" />
        <p>¡Hola! Me llamo Nicolas y estoy creando un clon de React Router.</p>
      </div>
      <Link to='/'>Ir al home</Link>
    </>
  )
}