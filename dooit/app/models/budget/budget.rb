module Budget
  class Budget < ApplicationRecord
    self.table_name = 'budgets'

    validates :category_id, presence: true
    validate :no_active_budget


    belongs_to :category, class_name: 'Budget::Category', foreign_key: 'category_id'
    belongs_to :user, class_name: 'User', foreign_key: 'user_id'

    scope :active, -> { where(active: true) }

    def no_active_budget
      # there should only be 1 budget per category at any time
    end
  end
end