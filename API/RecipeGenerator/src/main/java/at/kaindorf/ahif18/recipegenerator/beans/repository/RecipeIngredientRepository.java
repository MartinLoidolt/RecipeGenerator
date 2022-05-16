package at.kaindorf.ahif18.recipegenerator.beans.repository;

import at.kaindorf.ahif18.recipegenerator.beans.entities.RecipeIngredient;
import at.kaindorf.ahif18.recipegenerator.beans.entities.RecipeIngredientId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecipeIngredientRepository extends JpaRepository<RecipeIngredient, RecipeIngredientId> {
    @Override
    Optional<RecipeIngredient> findById(RecipeIngredientId recipeIngredientId);
}
