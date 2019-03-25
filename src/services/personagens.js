import { http } from './config'

export default	{



  listar:()=>{
		return http.get('personagens')
  },

  salvar:(personagem) =>{
	  return http.post('personagens',personagem)
  },

  atualizar:(personagem) =>{
	  return http.put('personagens', personagem)
  },

  apagar:(personagem) => {
	  return http.delete('personagens', { data: personagem})
  }
    
	
}