# GraphQL Schema Design

This exercise is part of the [React GraphQL Academy](http://reactgraphql.academy) training material.

## Learning objectives

- Learn how to create GraphQL schemas that are flexible and adapt to change
- Understand the tradeoffs of most common GraphQL design patterns

## Exercise part 1

### Tasks

1. Add price to a `Course`
2. Add currency to the price of the `Course`
3. Add slug to a `Course`. Requirement, we want to redirect to previous slugs
4. Add a cover image to the `Course`. Requirement, we only need to return a URL at this point.
5. We also want to return an alt for the image.
6. We want to be able to set the width and height of the image
7. We want to be able to apply the following transformations to an image: grayscale, fit, rotate, crop focus.
8. We want to be able to create fluid images and apply the previous transformations.
9. We want to add the location to the `Course`. A `Course` takes place in a given city, has an address, and postal code.
10. The same course could take place in different locations with different prices. Given a `Course`, we want to be able to create instances of it. The instance has the price and location information.

## Articles and links

- [GraphQL design tutorial by Shopify](https://github.com/Shopify/graphql-design-tutorial/blob/master/TUTORIAL.md)

## License

This material is available for private, non-commercial use under the [GPL version 3](http://www.gnu.org/licenses/gpl-3.0-standalone.html).
