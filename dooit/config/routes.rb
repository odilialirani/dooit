Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'stock/show'
    end
  end
  
  # Authentication routes
  post 'login', to: 'sessions#create'
  get '/logged_in', to: 'sessions#is_logged_in?'
  post 'logout', to: 'sessions#destroy'
  delete '/logout', to: 'sessions#destroy'

  namespace :api do
    namespace :v1 do
      get 'friends/index'
      get 'friends/create'
      get 'friends/show'
      get 'friends/destroy'
    end
  end
  namespace :api do
    namespace :v1 do
      get 'users/index'
      post 'users/create'
      get '/show/:id', to: 'users#show'
      delete '/destroy/:id', to: 'users#destroy'
    end
  end

  namespace :api do
    namespace :split do
      namespace :v1 do
        post 'receipts/upload'
        get 'receipts/all', to: 'receipts#index'

        get 'friends/all', to: 'friends#index'
      end
    end

    namespace :budget do
      namespace :v1 do
        namespace :page do
          get 'homepage'
          post 'add_spending'
          post 'add_category'
          post 'add_budget'
        end
      end
    end
  end

  root 'homepage#index'
  get '/*path' => 'homepage#index'
  
end
