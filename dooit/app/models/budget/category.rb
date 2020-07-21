module Budget
  class Category < ApplicationRecord
    self.table_name = 'budget_categories'

    belongs_to :user

    has_many :budgets, class_name: 'Budget::Budget', foreign_key: 'category_id'

    scope :active, -> { where(active: true) }

    def budget
      # returns current active budget
      budgets.active.first
    end
  end
end
