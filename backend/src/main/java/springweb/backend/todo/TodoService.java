package springweb.backend.todo;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class TodoService {

    private final TodoRepository todoRepository;

    public List<Todo> getAll() {
        return todoRepository.findAll();

    }

    public void delete(String id) {
        todoRepository.deleteById(id);
    }

    public Todo update(Todo todo) {
        Todo todoToUpdate = todo.withId(todo.id());

        return todoRepository.save(todoToUpdate);
    }

    public Todo getById(String id) {
        return todoRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Todo with id: " + id + " not found!"));
    }

    public Todo save(Todo todo) {
        return todoRepository.save(todo);
    }
}
