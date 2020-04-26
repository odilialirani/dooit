Rails.application.routes.draw do
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
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  
end
