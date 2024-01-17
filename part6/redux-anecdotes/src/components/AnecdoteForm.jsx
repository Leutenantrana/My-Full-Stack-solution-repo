import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const add = (event) => {
        event.preventDefault()

        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        
        dispatch(addAnecdote(content));
        dispatch(setNotification(`Anecdote '${content}' successfully added`, 5))

        

    }

    return (
        <div>
          
          <h2>create new</h2>
          <form onSubmit={add}>
            <input name="anecdote"/>
            <button type="submit"> create</button>
          </form>
        </div>
      )

}

export default AnecdoteForm