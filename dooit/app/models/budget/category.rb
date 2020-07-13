module Budget
  class Category < ApplicationRecord
    self.table_name = 'budget_categories'

    belongs_to :user
    has_many :budget
  end
end