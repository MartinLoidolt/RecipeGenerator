package at.kaindorf.ahif18.recipegenerator.controller;

import at.kaindorf.ahif18.recipegenerator.beans.entities.Recipe;
import at.kaindorf.ahif18.recipegenerator.beans.repository.IngredientRepository;
import at.kaindorf.ahif18.recipegenerator.beans.repository.RecipeIngredientRepository;
import at.kaindorf.ahif18.recipegenerator.beans.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;


@RestController
@RequestMapping("/recipes")
public class RecipeController {
    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private IngredientRepository ingredientRepository;

    @Autowired
    private RecipeIngredientRepository recipeIngredientRepository;

    @GetMapping(produces = "application/json")
    public ResponseEntity<Recipe> AllRecipes() {
        Recipe rec = recipeRepository.findById(1).get();
        return ResponseEntity.ok().body(rec);
    }

    @RequestMapping("/{name}")
    @GetMapping(produces = "application/json")
    public ResponseEntity<Recipe> GetRecipeByName(@PathVariable String name) {
        try {
            return ResponseEntity.ok().body(recipeRepository.findByName(name));
        } catch(Exception ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(consumes = "application/json")
    public ResponseEntity<Recipe> PostRecipe(@RequestBody Recipe recipe) {
        try {
            recipeRepository.save(recipe);
            return ResponseEntity.created(URI.create("")).build();
        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }
    }
}
