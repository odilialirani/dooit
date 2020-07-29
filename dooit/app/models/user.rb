class User < ApplicationRecord
  self.table_name = 'users'
  has_secure_password
   
  validates :username, presence: true, uniqueness: true
  validates :password, presence: true
  validates :first_name, presence: true
  validates :last_name, presence: true

  has_many :friends
  has_many :receipts
  has_many :categories, class_name: 'Budget::Category', foreign_key: 'user_id'
  has_many :budgets, class_name: 'Budget::Budget', foreign_key: 'user_id'

  def get_homepage_hash
      # [
      #   {
      #     id: 1,
      #     title: 'Food',
      #     budget_start_date: '',
      #     budget_end_date: '',
      #     spend_amount: '',
      #     budget_amount: '',
      #     spendings: [
      #       {
      #         location: '',
      #         amount: ''
      #       },
      #     ]
      #   }
      # ]
      categories.active.each_with_object([]) do |category, array|
        budget = category.budgets.active.first
        spendings = 
          budget.
          spendings.
          each_with_object([]) do |spending, arr|
            arr << {
              location: spending.location,
              amount: spending.amount
            }
          end
        array << {
          id: category.id,
          title: category.title,
          budget_id: budget&.id,
          budget_start_date: budget&.start_date,
          budget_end_date: budget&.end_date,
          budget_amount: budget&.amount,
          budget_spent: budget&.amount_spent,
          spendings: spendings
        }
      end
    end
end
