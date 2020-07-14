module Budget
  class Budget < ApplicationRecord
    self.table_name = 'budgets'

    validates :category_id, presence: true
    validate :no_active_budget


    belongs_to :category, class_name: 'Budget::Category', foreign_key: 'category_id'

    def no_active_budget
      # there should only be 1 budget per category at any time
    end
  end
end