import { useAuth} from "../hooks/useAuth"

const HomePage: React.FC =() =>{
    const {user} = useAuth()
    return(
        <h1>Chào {user?.email || "khách"}</h1>
    )
}
export default HomePage