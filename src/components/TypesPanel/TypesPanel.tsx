import { List, ListItem } from '@mui/material'
import { selectGlobal, useAppSelector } from '../../redux'
import { TypeCard } from './TypeCard.tsx'

export function TypesPanel() {
    const topics = useAppSelector(selectGlobal.topics)

    return (
        <List sx={{ padding: '2rem 1rem' }}>
            {topics.map((item, index) => (
                <ListItem key={index}>
                    <TypeCard index={index} type={item} />
                </ListItem>
            ))}
        </List>
    )
}
