package at.kaindorf.ahif18.recipegenerator.beans.repository;

import at.kaindorf.ahif18.recipegenerator.beans.entities.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Integer> {
    Recipe findByName(String name);

}