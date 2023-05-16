import { getItemLS } from "./Hooks"

export default function Home(){
    const user = getItemLS('loggedUser')

    return (
        <>
            <h1>Hi {user.name}!</h1>
            <h2>How is it going?</h2>
            
        </>
    )
}