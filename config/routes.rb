Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get "/users" => 'users#index'
  get "/users/:id" => 'users#show'
  post "/users" => 'users#create'
  patch "/users/:id" => 'users#update'
  delete "/users/:id" => 'users#destroy'

  get "/podcasts" => 'podcasts#index'
  get "/podcasts/:id" => 'podcasts#show'
  post "/podcasts" => 'podcasts#create'
  patch "/podcasts/:id" => 'podcasts#update'
  delete "/podcasts/:id" => 'podcasts#destroy'

  get "/comments" => 'comments#index'
  get "/commentables/:id" => 'comments#commentable'
  get "/comments/:id" => 'comments#show'
  post "/comments" => 'comments#create'
  patch "/comments/:id" => 'comments#update'
  delete "/comments/:id" => 'comments#destroy'
end
