import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

const users = [
    {
        userName: 'midudev',
        name: 'Miguel Angel Duran',
        isFollowing: true,
    },
    {
        userName: 'sjnico99',
        name: 'Nicolas Sanhueza Jaque',
        isFollowing: false,
    },
    {
        userName: 'elonmusk',
        name: 'Elon Musk',
        isFollowing: true,
    }
]

export function App () {
    return (
        <section className='App'>
            {
                users.map(({ userName, name, isFollowing }) => (
                    <TwitterFollowCard
                        key={userName}
                        userName={userName}
                        name={name}
                        initialIsFollowing={isFollowing}
                    >
                    </TwitterFollowCard>
                ))
            }
        </section>
    )
}