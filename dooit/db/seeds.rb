# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

9.times do |i|
  User.create(
    username: "dooituser#{ i + 1 }",
    password: SecureRandom.hex,
    first_name: "user#{ i + 1 }",
    last_name: "dooit#{ i + 1 }"
  )
end