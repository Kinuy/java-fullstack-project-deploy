package springweb.backend.todo;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/todo")
public class TodoController {
    private final TodoService todoService;

    @GetMapping
    List<Todo> getAll(){
        return todoService.getAll();
    }

    @PostMapping
    Todo postTodo(@RequestBody Todo todo){
        return todoService.save(todo);
    }

    @GetMapping("{id}")
    Todo getTodoById(@PathVariable String id){
        return todoService.getById(id);
    }

    @PutMapping(path={"{id}/update","{id}"})
    Todo update(@PathVariable String id, @RequestBody Todo todo){
        if(!todo.id().equals(id)){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        return todoService.update(todo);
    }

    @DeleteMapping("{id}")
    void delete(@PathVariable String id){
        todoService.delete(id);
    }
}
