package at.kaindorf.ahif18.recipegenerator.beans.repository;

import at.kaindorf.ahif18.recipegenerator.beans.entities.Recipe;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends CrudRepository<Recipe, Integer> {
    Recipe findByName(String name);

    @Override
    Iterable<Recipe> findAll();
}